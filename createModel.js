import { OrbisDB } from "@useorbis/db-sdk";
import { OrbisKeyDidAuth } from "@useorbis/db-sdk/auth";

const deploy = async () => {
  // replace this with your model definition
  const def = {
    version: "2.0",
    name: "pageview",
    views: {
      issuer: {
        type: "documentAccount",
      },
    },
    schema: {
      type: "object",
      $defs: {
        DateTime: {
          type: "string",
          title: "DateTime",
          format: "date-time",
          maxLength: 100,
        },
      },
      $schema: "https://json-schema.org/draft/2020-12/schema",
      required: ["page", "address", "timestamp", "customer_user_id"],
      properties: {
        page: {
          type: "string",
        },
        address: {
          type: "string",
        },
        timestamp: {
          $ref: "#/$defs/DateTime",
        },
        customer_user_id: {
          type: "integer",
        },
      },
      additionalProperties: false,
    },
    interface: false,
    implements: [],
    accountRelation: {
      type: "list",
    },
    immutableFields: [],
  };

  // create a new OrbisDB instance
  const orbis = new OrbisDB({
    ceramic: {
      gateway: "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/",
    },
    nodes: [
      {
        gateway: "https://studio.useorbis.com",
        env: "<your env ID here>",
      },
    ],
  });

  // generate a seed or use an existing one
  const seed = await OrbisKeyDidAuth.generateSeed("hex");

  // authenticate with the seed
  const auth = await OrbisKeyDidAuth.fromSeed(seed);
  await orbis.connectUser({ auth });

  // deploy the model
  //@ts-ignore
  const deployed = await orbis.ceramic.createModel(def);
  console.log(deployed); // this will log your table's ID --> you can view this in your browser by visiting https://cerscan.com/mainnet/stream/<your table ID>
};

deploy();