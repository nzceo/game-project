import actors from '../actors/town'

/**
 * This is essentially test data, the client should send its own
 * mapdata
 */
const maps = [
  {
    id: "golden-boot-inn",
    name: "The Golden Boot",
    connectionRefs: [],
    actorRefs: actors
  },
];

export default maps;