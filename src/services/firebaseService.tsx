export class BaseRepository {
    private baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    protected get<T>(endpoint: string): Promise<T> {
        return fetch(this.baseUrl + endpoint, {
            method: 'GET', headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json() as Promise<T>;
        })
    }
}

export default BaseRepository