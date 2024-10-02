# Simple OrbisDB Model Deployment Boilerplate

You can use this repository to help deploy data models of any complexity to the Ceramic Network (to use with OrbisDB) that you cannot achieve through the [Orbis Studio](https://studio.useorbis.com/).

## Getting Started

1. Install your dependencies

```bash
npm install
```

2. Replace the `def` object in [createModel.js](createModel.js) with your own

3. Replace `env` on line 58 in [createModel.js](createModel.js) with your own

4. When ready, run the following command to deploy your data model:

```bash
npm run create-model
```