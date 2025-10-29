const fs = require('fs');
const path = require('path');

const main = require('./main.json');
const components = require('./components.json');

const bundled = {
    ...main,
    ...components
};

if (!bundled.paths) {
    bundled.paths = {};
}

const jsonPaths = fs.readdirSync(path.join(__dirname, 'paths'));
for (const jsonPath of jsonPaths) {
    const jsonPathContent = fs.readFileSync(path.join(__dirname, 'paths', jsonPath), 'utf8');
    const jsonPathObject = JSON.parse(jsonPathContent);
    bundled.paths[jsonPathObject.path] = jsonPathObject.methods;
}

if (!bundled.webhooks) {
    bundled.webhooks = {};
}

const jsonWebhooks = fs.readdirSync(path.join(__dirname, 'webhooks'));
for (const jsonWebhook of jsonWebhooks) {
    const jsonWebhookContent = fs.readFileSync(path.join(__dirname, 'webhooks', jsonWebhook), 'utf8');
    const jsonWebhookObject = JSON.parse(jsonWebhookContent);

    if ('schemas' in jsonWebhookObject) {
        if (!bundled.components.schemas) {
            bundled.components.schemas = {};
        }
        for (const schema in jsonWebhookObject.schemas) {
            bundled.components.schemas[schema] = jsonWebhookObject.schemas[schema];
        }
    }

    if ('events' in jsonWebhookObject) {
        if (!bundled.webhooks) {
            bundled.webhooks = {};
        }
        for (const event in jsonWebhookObject.events) {
            bundled.webhooks[event] = jsonWebhookObject.events[event];
        }
    }
}

fs.writeFileSync(path.join(__dirname, '..', '..', 'api-reference', 'openapi.json'), JSON.stringify(bundled, null, 2));
