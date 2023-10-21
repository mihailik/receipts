// @ts-check
/// <reference path="./lib/decl.d.ts" />

function receipts() {
  function runInBrowser() {
    function initSearchPageDOM() {
      const host = elem('div', {
        id: 'receiptsHost',
        innerHTML: `
<div class=titlePane>
  <h2> Receipts: </h2>
</div>
<div class=searchPane>
  <input id=searchINPUT placeholder='Who are we talking about?'>
</div>
<div class=statsPane>
</div>
<div class=resultsPane>
<div style="padding: 1em;">
  Searching BlueSky activity of a user: to verify their identity, and to find their receipts.
</div>
</div>
<style>
#receiptsHost {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  display: grid;
  grid-template-rows: 1fr auto auto auto 1fr;
  grid-template-columns: 1fr 1fr;
}

.titlePane {
  grid-row: 2;
}

.titlePane h2 {
  font-size: 400%;
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
}

.searchPane {
  grid-row: 3;
  grid-row: 3;
  position: relative;
  padding: 2em;
  padding-top: 1em;
}

.searchPane #searchINPUT {
  width: 100%;
  font-size: 120%;
  border: none;
  border-bottom: solid 1px black;
  outline: none;
  transition: border-bottom 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.searchPane #searchINPUT:focus {
  border-bottom: solid 1px #006cfd;
  box-shadow: 0 1px 0 #006cfd;
}

.statsPane {
  grid-row: 4;
}

.resultsPane {
  grid-row-start: 1;
  grid-row-end: 7;
  grid-column: 2;
}

</style>
      `});

      /**
       * @type {{
       *  host: HTMLElement,
       *  titlePane: HTMLElement,
       *  titleH2: HTMLElement,
       *  searchPane: HTMLElement,
       *  searchINPUT: HTMLInputElement,
       *  statsPane: HTMLElement,
       *  resultsPane: HTMLElement
       * }}
       */
      const dom = /** @type {*} */({});

      for (const ch of [...host.children]) {
        if (ch.id) dom[ch.id] = ch;
        else if (ch.className) dom[ch.className] = ch;
      }
      dom.host = host;
      dom.titleH2 = /** @type {*} */(dom.titlePane.querySelector('h2'));
      document.body.appendChild(host);

      return dom;
    }

    /**
     * @param {TagName} tagName
     * @param {(
     *  Omit<
     *    Partial<HTMLElement['style']> &
     *     Partial<HTMLElementTagNameMap[TagName]
     *  >, 'children' | 'parent' | 'parentElement' | 'style'> &
     *  {
     *    children?: (Element | string | null | void | undefined)[],
     *    parent?: Element | null, 
     *    parentElement?: Element | null,
     *    style?: string | Partial<HTMLElement['style']>
     *  })=} [style]
     * @returns {HTMLElementTagNameMap[TagName]}
     * @template {string} TagName
     */
    function elem(tagName, style) {
      const el = document.createElement(tagName);

      if (style && typeof /** @type {*} */(style).appendChild === 'function') {
        const tmp = parent;
        style = /** @type {*} */(parent);
        parent = tmp;
      }

      if (typeof style === 'string') {
        if (/** @type{*} */(style).indexOf(':') >= 0) el.style.cssText = style;
        else el.className = style;
      }
      else if (style) {
        /** @type {Element | undefined} */
        let setParent;
        /** @type {Element[] | undefined} */
        let appendChildren;
        for (const key in style) {
          if (key === 'parent' || key === 'parentElement') {
            setParent = /** @type {*} */(style[key]);
            continue;
          }
          else if (key === 'children') {
            appendChildren = /** @type {*} */(style[key]);
            continue;
          }
          else if (style[key] == null || (typeof style[key] === 'function' && !(key in el))) continue;

          if (key in el.style) el.style[key] = /** @type {*} */(style[key]);
          else if (key in el) el[key] = style[key];
        }

        if (appendChildren) {
          for (const child of appendChildren) {
            if (child == null) continue;
            if (typeof child === 'string') {
              const childText = document.createTextNode(child);
              el.appendChild(childText);
            } else {
              el.appendChild(child);
            }
          }
        }

        if (setParent && typeof setParent.appendChild === 'function') setParent.appendChild(el);
      }

      return /** @type {*} */(el);
    }

    const waitForLibrariesLoaded = new Promise((resolve) => {
      // @ts-ignore
      receipts = () => {
        resolve(undefined);
      }
    });

    /** @type {*} */(window).module = { exports: {}  };

    const dom = initSearchPageDOM();

  }


  function runInLocalNodeScript() {
    const fs = require('fs');
    const path = require('path');
    const atproto_api = require('./lib.js');

    function convertAtlasDbJsonpUsers() {
      console.log('Preloading from Atlas...');
      const users = getAtlasDbJsonpUsers();
      console.log(Object.keys(users).length, ' users loaded from Atlas.');
      const byFirst2Letters = {};
      const undecided = [];
      for (const shortDID in users) {
        let shortHandle = users[shortDID];
        let displayName;
        if (Array.isArray(shortHandle)) {
          displayName =
            typeof shortHandle[1] === 'string' ? shortHandle[1] :
              typeof shortHandle[shortHandle.length - 1] === 'string' ? shortHandle[shortHandle.length - 1] :
                undefined;
          shortHandle = shortHandle[0];
        }

        if (typeof shortHandle !== 'string') {
          undecided.push(shortDID);
          continue;
        }

        const first2Letters = getHandleBucket(shortHandle);
        const bucket = byFirst2Letters[first2Letters] || (byFirst2Letters[first2Letters] = {});
        bucket[shortDID] = displayName ? [shortHandle, displayName] : shortHandle;
      }

      const receiptsDbDir = path.resolve(__dirname, '../receipts-db');
      console.log('Saving ' + Object.keys(byFirst2Letters).length + ' files to ' + receiptsDbDir + '...');
      for (const first2Letters in byFirst2Letters) {
        console.log('  ' + first2Letters + '.js');
        const bucket = byFirst2Letters[first2Letters];
        const letterDir = first2Letters.split('/')[0];

        if (!fs.existsSync(letterDir)) fs.mkdirSync(letterDir);

        saveJsonp(
          path.resolve(receiptsDbDir, first2Letters + '.js'),
          '{\n' +
          Object.keys(bucket).map(shortDID =>
            JSON.stringify(shortDID) + ':' + JSON.stringify(bucket[shortDID]))
            .join(',\n') +
          '\n}'); 
      }
      console.log('Saved ' + Object.keys(byFirst2Letters).length + ' buckets');
    }

    function getAtlasDbJsonpUsers() {
      const usersDir = path.resolve(__dirname, '../atlas-db-jsonp/users');
      const users = evalJsonp(
        fs.readFileSync(path.resolve(usersDir, 'hot.js'), 'utf8')
      );
      const storeFiles = fs.readdirSync(usersDir)
        .map(file => path.resolve(usersDir, file))
        .filter(file => /\bstore-\b/i.test(file));
      const storeUsers = storeFiles
        .map(file => {
          console.log('  ' + path.basename(file));
          return evalJsonp(
            fs.readFileSync(file, 'utf8'));
        });
      for (const store of storeUsers) {
        Object.assign(users, store);
      }
      return users;
    }

    /** @param {string} jsonpText */
    function evalJsonp(jsonpText) {
      const varName = /var\s+([_$a-z0-9_]+)\s*=/i.exec(jsonpText)?.[1] || 'jsonp';
      const value = eval(jsonpText + '; ' + varName);
      return value;
    }

    /**
     * @param {string} filePath
     * @param {*} obj
     */
    function saveJsonp(filePath, obj) {
      const funcName = jsonpFuncName(filePath);
      const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
      const jsonpWrapped =
        "var cursors=(function(jsonp){ if (typeof cursors==='function')cursors(jsonp); return cursors=jsonp })(".replace(
          /cursors/g,
          funcName
        ) +
        json +
        ') // ' + new Date().toISOString() + ' ' + process.platform + process.arch + ' node-' + process.versions.node + ' v8-' + process.versions.v8 + '\n';
      fs.writeFileSync(filePath, jsonpWrapped);
    }

    /** @param {string} path */
    function jsonpFuncName(path) {
      return /** @type {string} */(path.split(/[/\\]/g).pop())
        .replace(/\.js$/, '')
        .replace(/[^a-z0-9]/ig, '')
        .replace(/^([0-9]|do|if|in)/ig, '_$1');
    }

    function loadFromReceitptsDb() {
      const allUsers = {};
      const byFirst2Letters = {};
      const receiptsDbDir = path.resolve(__dirname, '../receipts-db');
      const dirs = fs.readdirSync(receiptsDbDir)
        .map(dir => path.resolve(receiptsDbDir, dir))
        .filter(dir => path.basename(dir).length === 1 && fs.statSync(dir).isDirectory());

      for (const dir of dirs) {
        const files = fs.readdirSync(dir)
          .map(file => path.resolve(dir, file))
          .filter(file => /\.js$/.test(file));

        for (const file of files) {
          const bucket = evalJsonp(fs.readFileSync(file, 'utf8'));
          Object.assign(allUsers, bucket);
          const first2Letters = path.basename(file, '.js');
          byFirst2Letters[first2Letters] = bucket;
        }
      }

      return { allUsers, byFirst2Letters };
    }

    async function updateUsers() {
      console.log('Reading receipts-db...');
      const { allUsers, byFirst2Letters } = loadFromReceitptsDb();
      console.log('  OK ' + Object.keys(allUsers).length + ' users.');

      const cursors = getLastCursors();

      const atClient = new atproto_api.BskyAgent({ service: 'https://bsky.social/xrpc' });

      let currentCursor = cursors?.listRepos?.cursor;
      let saveBuckets = [];
      while (true) {
        try {
          const start = Date.now();
          const nextList = await atClient.com.atproto.sync.listRepos({ cursor: currentCursor });

          if (nextList.data?.repos?.length) {
            saveBuckets = [];
            console.log((currentCursor || 'START') + '...' + (nextList.data.cursor || 'END') + ' [' + nextList.data.repos.length + ']...');

            for (const repo of nextList.data.repos) {
              // if (allUsers[repo.did]) {
              //   knownUserCount++;
              //   continue;
              // }

              process.stdout.write('  ' + shortenDID(repo.did));
              const  descr = await updateAccountInfo(repo.did);
              console.log(' ' + JSON.stringify(descr));
            }

            process.stdout.write('Saving ' + saveBuckets.length + ' buckets...');
            for (const first2Letters of saveBuckets) {
              const bucket = byFirst2Letters[first2Letters];
              const filePath = path.resolve(__dirname, '../receipts-db', first2Letters + '.js');
              const letterDir = path.resolve(__dirname, '../receipts-db', first2Letters.split('/')[0]);
              if (!fs.existsSync(letterDir)) fs.mkdirSync(letterDir);
              saveJsonp(filePath, bucket);
            }
            process.stdout.write(' cursors...');
            fs.writeFileSync(path.join(__dirname, '../receipts-db/cursor.json'), JSON.stringify({ listRepos: { cursor: nextList.data.cursor, time: Date.now() } }));
            console.log(' OK');
          }
          const batchEndTime = Date.now();
          console.log('  ' + (batchEndTime - start) / 1000 + 's, ' + (nextList.data?.repos?.length || 0) / (batchEndTime - start ) / 1000  + ' per second\n\n');


          if (!nextList.data?.cursor) break;
          currentCursor = nextList.data.cursor;
        } catch (handlingError) {
          console.error('Error while listing repos', handlingError);
          await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
          continue;
        }
      }

      async function updateAccountInfo(did) {
        const describePromise = atClient.com.atproto.repo.describeRepo({
          repo: did
        });
        const profilePromise = atClient.com.atproto.repo.listRecords({
          collection: 'app.bsky.actor.profile',
          repo: did
        });
        // const blocksPromise = atClient.com.atproto.repo.listRecords({
        //   collection: 'app.bsky.actor.block',
        //   repo: did
        // });

        const [describe, profile/*, blocks*/] = await Promise.all([describePromise, profilePromise/*, blocksPromise*/]);

        const shortDID = shortenDID(did) || did;
        const shortHandle = shortenHandle(describe.data?.handle);
        const displayName = profile.data.records.map(rec => /** @type {*} */(rec.value).displayName).filter(d => d)[0];

        const first2Letters = getHandleBucket(shortHandle);
        const bucket = byFirst2Letters[first2Letters] || (byFirst2Letters[first2Letters] = {});
        const descr = displayName ? [shortHandle, displayName] : shortHandle;
        bucket[shortDID] = descr;
        allUsers[shortDID] = descr;

        if (saveBuckets.indexOf(first2Letters) < 0) saveBuckets.push(first2Letters);

        return descr;
      }

      function getLastCursors() {
        try {
          const lastCursors = JSON.parse(fs.readFileSync(path.join(__dirname, '../receipts-db/cursor.json'), 'utf8'));
          return lastCursors;
        } catch (_error) {}
      }
    }

    // console.log('Transferring Atlas users...');
    // convertAtlasDbJsonpUsers();

    console.log('Receipts updates: users...');
    updateUsers();
  }

  function runInAzure() {
  }

  function runAsModule() {
  }

  function getHandleBucket(shortHandle) {
    const first2Letters =
      /\d/.test(shortHandle.charAt(0)) ? '00' :
        shortHandle.replace(/[^a-z0-9]/g, '').replace(/[1-9]+/g, '0').slice(0, 2).toLowerCase();
    return first2Letters.charAt(0) + '/' + first2Letters;
  }

  /** @param {string | null | undefined} did */
  function shortenDID(did) {
    return typeof did === 'string' ? did.replace(/^did\:plc\:/, '') : did;
  }

  function unwrapShortDID(shortDID) {
    return shortDID.indexOf(':') < 0 ? 'did:plc:' + shortDID : shortDID;
  }

  /** @param {string} handle */
  function shortenHandle(handle) {
    return handle && handle.replace(_shortenHandle_Regex, '');
  }
  const _shortenHandle_Regex = /\.bsky\.social$/;

  function detectEnvironmentAndRun() {
    var isBrowserEnvironment =
      typeof window !== 'undefined' && window && typeof window.alert === 'function' &&
      typeof document !== 'undefined' && document && typeof document.createElement === 'function';

    var isNodeEnvironment =
      typeof process !== 'undefined' && process && process.env &&
      typeof require === 'function' &&
      typeof module !== 'undefined' && module;

    var isLocalNodeScript =
      isNodeEnvironment &&
      require.main === module;

    var isAzure =
      isNodeEnvironment &&
      !isLocalNodeScript &&
      process.env.WEBSITE_HOSTNAME;

    var isLoadedAsModule =
      isNodeEnvironment &&
      !isLocalNodeScript &&
      !isAzure;

    if (isBrowserEnvironment) return runInBrowser();
    if (isLocalNodeScript) return runInLocalNodeScript();
    if (isAzure) return runInAzure();
    if (isLoadedAsModule) return runAsModule();

    throw new Error('Unknown environment, exiting main script.');
  }

  detectEnvironmentAndRun();

}
receipts();
