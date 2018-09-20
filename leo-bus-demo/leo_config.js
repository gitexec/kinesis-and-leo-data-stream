'use strict';

const development = {
  region: "us-west-2",
  profile: "leo-demo",
  leosdk: {
    Region: "us-west-2",
    LeoArchive: "DevBus-LeoArchive-EV40AV12VN7Y",
    LeoCron: "DevBus-LeoCron-1FLNC9Z5KSB72",
    LeoEvent: "DevBus-LeoEvent-15BW5AWF2WDL",
    LeoFirehoseStream: "DevBus-LeoFirehoseStream-WLRD5KQ5ISSP",
    LeoKinesisStream: "DevBus-LeoKinesisStream-1LGSWLTEDERND",
    LeoS3: "devbus-leos3-1vgbqr50913nz",
    LeoSettings: "DevBus-LeoSettings-14HODE41JWL2O",
    LeoStream: "DevBus-LeoStream-UY635GZGFIUQ",
    LeoSystem: "DevBus-LeoSystem-AHQC22IPM23A"
  },
  leoauth: {
    Region: "us-west-2",
    LeoAuth: "DevAuth-LeoAuth-LOG79AKRRTFR",
    LeoAuthIdentity: "DevAuth-LeoAuthIdentity-1OVY6KPB8ZAWN",
    LeoAuthPolicy: "DevAuth-LeoAuthPolicy-1KGQH0ER37AAP",
    LeoAuthUser: "DevAuth-LeoAuthUser-VH4EUCCJAUJM"
  }
}

module.exports = {
  _global: {},
  development,
  _local: () => Object.assign(development, {
    leoaws: {
      profile: "leo-demo",
      region: "us-west-2"
    }
  })
}