import * as atproto_api from '@atproto/api';
// import * as atproto_repo from '@atproto/repo';

[(typeof globalThis !== 'undefined' && globalThis ||
  typeof window !== 'undefined' && window ||
  typeof self !== 'undefined' && self ||
  this)].map(self => {
    self.atproto_api = atproto_api;
    //self.atproto_repo = atproto_repo;
    console.log(
      'loaded @atproto/api ', atproto_api,
      //' @atproto/repo ', atproto_repo
    );
  });