import axios from "axios";
import { Repository } from "../Interfaces/Repository";
import { RepositoryPayload } from "../Interfaces/RepositoryPayload";
import { GithubUser } from "../Interfaces/GithubUser";
import AuthService from "./AuthService";

const GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';

const githubApiClient = axios.create({
    baseURL: GITHUB_API_BASE_URL,
    headers: {
        'Accept': 'application/vnd.github.v3+json',
    },
});

githubApiClient.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers['Authorization'] = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchRepositories = async (): Promise<Repository[]> => {
    try {
        const response = await githubApiClient.get("/user/repos", {
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
                affiliation: 'owner',
                t:Date.now()
            },
        });
        return response.data as Repository[];
    } catch (error) {
        throw new Error(`${(error as Error).message}`);
    }
}

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
    try{
        const response = await githubApiClient.post("/user/repos", repository);
        return response.data as Repository;
    }catch(error){
        throw new Error(`${(error as Error).message}`);        
    }
}


export const getUserInfo = async () : Promise<GithubUser | null> => {
    try{
        const response = await githubApiClient.get("/user");        
        return response.data as GithubUser;

    }catch(error){
        throw new Error(`${(error as Error).message}`);            
    }
    
};

export const updateRepository = async (
    oldName: string,
    repository: RepositoryPayload
): Promise<Repository | null> => {
    try {
        const username = AuthService.getUsername();

        const response = await githubApiClient.patch(
            `/repos/${username}/${oldName}`,
            repository
        );        

        return response.data as Repository;

    } catch (error) {
        throw new Error(`${(error as Error).message}`);
    }
};


export const deleteRepository = async (repoName: string): Promise<void> => {
    try {
        const username = AuthService.getUsername();

        await githubApiClient.delete(
            `/repos/${username}/${repoName}`
        );
    } catch (error) {
        throw new Error(`${(error as Error).message}`);
    }
};