export default {
    install(app) {
        app.config.globalProperties.$addCloudflareScript = () => {
            const script = document.createElement('script');
            script.defer = true;
            script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
            script.dataset.cfBeacon = '{"token": "d3f917142ba44ea18207f6b160943669"}';
            document.body.appendChild(script);
        };
    },
};