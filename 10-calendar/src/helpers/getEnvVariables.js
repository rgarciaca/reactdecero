

export const getEnvVariables = () => {
    //import.meta.env;

    return {
        //...import.meta.env,
        VIT_MODE: import.meta.env.VIT_MODE,
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }
}