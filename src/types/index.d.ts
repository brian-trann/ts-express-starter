
/**
 * The `Secrets` type contains the ___processed___ environment variables. Secrets that are suffixed with
 * `_UAT` is mapped to that key, but with the suffixed removed.
 *
 * For instance, if `API_KEY` exists in the `SECRET_CHANGES_FOR_UAT` set, the `parseEnvs` function will
 * use `API_KEY_UAT` key:value pair, but map it to `API_KEY` for usage in the general app.
 */
export type Secrets = _Secrets &
    Partial<{
        API_KEY: string;
        API_URL: string;
        BOOLEAN: boolean;
        PG_DATABASE_URI: string;
        PORT: number;
        REQUIRED_USERNAME: string;
        REQUIRED_PASSWORD: string;
    }>;

type _Secrets = {
    [key: string]: unknown;
};

export interface AppError extends Error {
    status?: number;
}
