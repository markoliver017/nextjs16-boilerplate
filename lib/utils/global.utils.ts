export const getAppUrl = () => {
    const url = process.env.APP_URL?.trim() || "http://localhost:3000";
    return url.endsWith("/") ? url.slice(0, -1) : url;
};
