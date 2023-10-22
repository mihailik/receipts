import * as atproto_api from '@atproto/api';
export * from '@atproto/api/dist';
import * as fuse from 'fuse.js';

// import * as atproto_repo from '@atproto/repo';

[(typeof globalThis !== 'undefined' && globalThis ||
  typeof window !== 'undefined' && window ||
  typeof self !== 'undefined' && self ||
  this)].map(self => {
    const exported = atproto_api;
    self.atproto_api = exported;
    self.fuse = fuse;
    //self.atproto_repo = atproto_repo;
    console.log(
      'loaded @atproto/api ', exported,
      //' @atproto/repo ', atproto_repo
    );
  });