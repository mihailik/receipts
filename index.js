// @ts-check
/// <reference path="./lib/decl.d.ts" />

function receipts() {
  function runInBrowser() {
    function initSearchPageDOM() {
      const host = elem('div', {
        id: 'receiptsHost',
        innerHTML: `
<div class=banner>
</div>
<div class=titlePane>
  <h2> History search: </h2>
</div>
<div class=searchPane>
  <input id=searchINPUT placeholder='Who are we talking about?'>
</div>
<div class=statsPane>
</div>
<div class=closeLink></div>
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
  grid-column: 1;
}

.titlePane h2 {
  font-size: 400%;
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
  background: linear-gradient(to top, white -0.25em, transparent 0.5em);
  text-shadow: 1px 1px 13px white, 1px 1px 2px #fffffff2, -1px -1px 2px #ffffffe6;
}

.searchPane {
  grid-row: 3;
  grid-row: 3;
  grid-column: 1;
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

.searchPane .autocomplete {
  position: absolute;
  background: white;
  padding: 0.3em 0;
  border: solid 1px #00000078;
  box-shadow: 6px 6px 9px #0000001f;
  transform: translate(0.2em, 0.2em);
  max-height: 15em;
  overflow: auto;
}

.searchPane .autocomplete .autocomplete-item {
  padding: 0.1em 0.5em 0.2em 0.5em;
  cursor: default;
}

.searchPane .autocomplete .autocomplete-item .autocomplete-item-at {
  opacity: 0.7;
  font-weight: 300;
  padding-right: 0.12em;
}

.searchPane .autocomplete .autocomplete-item .autocomplete-item-displayName {
  padding-left: 0.5em;
  zoom: 0.8;
  transform: scaleY(1.1);
  display: inline-block;
  font-weight: 300;
  opacity: 0.8;
}

.searchPane .autocomplete .autocomplete-item:hover {
  background: #e2f1ff;
}

.searchPane .autocomplete .autocomplete-item.selected {
  background: #b3dbf9;
}

.searchPane .autocomplete .autocomplete-item.selected:hover {
  background: #8fc7f1;
}

.banner {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column: 1;
  background: no-repeat center center;
  background-size: cover;
}

.statsPane {
  grid-row: 4;
  padding: 2em 2em 0 2em;
}

.statsPane .avatar .avatar-image {
  width: 4em;
  border-radius: 6em;
  float: left;
  margin-right: 0.7em;
}

.statsPane .handle {
  padding-bottom: 0.5em;
  display: block;
}

.statsPane .did {
  font-size: 90%;
  opacity: 0.8;
  display: block;
}

.statsPane .did .did-prefix {
  opacity: 0.6;
}

.statsPane .bio {
  clear: both;
  font: inherit;
  white-space: pre-line;
  padding-top: 2em;
  padding-left: 1em;
}

.resultsPane {
  grid-row-start: 1;
  grid-row-end: 7;
  grid-column: 2;
  overflow: auto;

  border-left: solid 1px #d4d4d4;
  box-shadow: inset 3px 0px 8px #00000021;
}

.resultsPane .post-list {
  padding: 1em;
}

.resultsPane .post-list .post {
  padding: 0.5em 0;
}

.resultsPane .post-list .post .post-content-line-timestamp a {
  color: royalblue;
  text-decoration: none;
}
.resultsPane .post-list .post .post-content-line-timestamp a:hover {
  text-decoration: underline;
}

.resultsPane .post-list .post .post-content-line-text {
  padding-top: 0.25em;
  white-space: pre-wrap;
}

.resultsPane .search-panel {
  position: sticky;
  top: 0;
  background: #cecece;
  border-bottom: solid 1px #b1b1b1;
  border-top: solid 1px #bab6b6;
  box-shadow: 0px 6px 15px #00000038;
  padding: 0.5em 1em;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}

.resultsPane .search-panel .post-search-input {
  font-size: inherit;
  outline: none;
  border: solid 1px #afafaf;
  grid-row: 1;
  grid-column: 1;
}

.resultsPane .search-panel .post-search-clear {
  grid-row: 1;
  grid-column: 1;
  justify-self: end;
  padding-right: 0.3em;
  cursor: pointer;
}

.closeLink {
  position: relative;
  transform: scale(1.5);
  width: 1em;
  height: 1em;
  margin-top: 0.7em;
  margin-right: 0.7em;
  cursor: pointer;
  justify-self: end;
  align-self: start;
  font-size: 100%;
  grid-row: 1;
  grid-column: 1;
  color: black;
  border-radius: 2em;
  background-image: linear-gradient(-45deg, transparent 0%, transparent 46%, currentColor 46%, currentColor 56%,transparent 56%, transparent 100%), -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, currentColor 46%, currentColor 56%,transparent 56%, transparent 100%);
  filter: drop-shadow(0px 0px 1px white) drop-shadow(3px -3px 10px white) drop-shadow(10px -10px 30px white);
}


@media (max-width: 800px) {
  #receiptsHost {
    grid-template-rows: 1fr auto auto auto 5fr;
    grid-template-columns: 1fr;
  }

  .titlePane {
    grid-row: 2;
    grid-column: 1;
  }

  .searchPane {
    grid-row: 3;
    grid-column: 1;
    position: relative;
    padding: 2em;
    padding-top: 1em;
  }

  .statsPane {
    grid-row: 4;
    grid-column: 1;
  }

  .resultsPane {
    grid-row: 5;
    grid-column: 1;

    border-left: none;
    box-shadow: none;
  }
}

</style>
      `});

      /**
       * @type {{
       *  host: HTMLElement,
       *  banner: HTMLElement,
       *  titlePane: HTMLElement,
       *  titleH2: HTMLElement,
       *  searchPane: HTMLElement,
       *  searchINPUT: HTMLInputElement & { autocompleteDIV?: HTMLDivElement },
       *  statsPane: HTMLElement,
       *  resultsPane: HTMLElement,
       *  closeLink: HTMLElement
       * }}
       */
      const dom = /** @type {*} */({});

      for (const ch of [...host.querySelectorAll('*')]) {
        if (ch.id) dom[ch.id] = ch;
        else if (ch.className) dom[ch.className] = ch;
      }
      dom.host = host;
      dom.titleH2 = /** @type {*} */(dom.titlePane.querySelector('h2'));
      document.body.appendChild(host);

      return dom;
    }

    var jsonpLoadingCache;

    /** @param {string} relativePath */
    function loadJsonp(relativePath) {
      if (!jsonpLoadingCache) jsonpLoadingCache = {};
      if (jsonpLoadingCache[relativePath]) return jsonpLoadingCache[relativePath];

      return jsonpLoadingCache[relativePath] = new Promise((resolve, reject) => {
        const funcName = jsonpFuncName(relativePath);
        let completed = false;
        /** @type {*} */(window)[funcName] = (data) => {
          queueCleanupGlobal();
          if (completed) {
            console.log('JSONP data arrived after promise completed ', funcName, ': ', data);
            return;
          }
          completed = true;
          jsonpLoadingCache[relativePath] = data;
          resolve(data);
        };
        const script = document.createElement('script');
        script.onerror = (error) => {
          if (completed) {
            console.log('JSONP script error fired after promise completed ', funcName, ': ', error);
            return;
          }
          completed = true;
          queueCleanupGlobal();
          delete jsonpLoadingCache[relativePath];
          reject(error);
        };
        script.onload = function () {
          setTimeout(() => {
            if (!completed) {
              let errorText =
                'JSONP script onload fired, but promise never completed: potentially bad JSONP response ' + funcName;
              try {
                errorText += ': ' + script.outerHTML;
              } catch (errorGettingScriptElement) {
                errorText += ', <' + 'script' + '> element not accessible';
              }
              console.log(errorText);
              completed = true;
              delete jsonpLoadingCache[relativePath];
              reject(new Error(errorText));
            }
            queueCleanupGlobal();
          }, 300);
        };
        script.src = relativePath;
        document.body.appendChild(script);

        var cleanupGlobalTimeout;
        var cleaned;
        function queueCleanupGlobal() {
          if (cleaned) return;
          clearTimeout(cleanupGlobalTimeout);
          cleanupGlobalTimeout = setTimeout(() => {
            delete window[funcName];
            if (script.parentElement) script.parentElement.removeChild(script);
            cleaned = true;
          }, 500);
        }
      });
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

          if (key in el) el[key] = style[key];
          else if (key in el.style) el.style[key] = /** @type {*} */(style[key]);
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

    function getInputSelectionShortDID(searchINPUT) {
      if (!searchINPUT.autocompleteDIV) return;
      const items = [...searchINPUT.autocompleteDIV.querySelectorAll('.autocomplete-item')];
      for (const item of items) {
        if (item.classList.contains('selected')) return item.shortDID;
      }
    }

    /** @param {KeyboardEvent} e */
    function handleInputKeydown(e) {
      const ArrowDown = 40;
      const ArrowUp = 38;
      if (e.keyCode === ArrowDown) {
        e.preventDefault();
        shiftSelection(+1);
      } else if (e.keyCode === ArrowUp) {
        e.preventDefault();
        shiftSelection(-1);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        acceptSelection();
      } else if (e.keyCode === 27) {
        e.preventDefault();
        cancelEdit();
      }

      function shiftSelection(direction) {
        if (!dom.searchINPUT.autocompleteDIV) return;
        const items = [...dom.searchINPUT.autocompleteDIV.querySelectorAll('.autocomplete-item')];
        if (!items.length) return;

        const selectedShortDID = getInputSelectionShortDID(dom.searchINPUT);
        const selectedIndex = items.findIndex(item => /** @type {*} */(item).shortDID === selectedShortDID);

        const nextSelectedIndex = selectedIndex < 0 ?
          (direction > 0 ? 0 : items.length - 1) :
          Math.max(0, Math.min(items.length - 1, selectedIndex + direction));

        if (nextSelectedIndex !== selectedIndex) {
          items[selectedIndex]?.classList.remove('selected');
          items[nextSelectedIndex]?.classList.add('selected');
        }
      }

      function acceptSelection() {
        const items = [...(dom.searchINPUT.autocompleteDIV?.querySelectorAll('.autocomplete-item') || [])];
        if (!items.length) return;

        let navToShortDID = getInputSelectionShortDID(dom.searchINPUT);
        if (!navToShortDID) {
          navToShortDID =/** @type {*} */(items[0]).shortDID;
          if (!navToShortDID) return;
        }

        // @ts-ignore
        const navToShortHandle = items.find(item => item.shortDID === navToShortDID)?.shortHandle;

        navigateToSearchAccount(navToShortDID, navToShortHandle, undefined);
      }

      function cancelEdit() {
      }
    }

    var handleSearchType_debounceTimeout;
    function handleSearchType() {
      clearTimeout(handleSearchType_debounceTimeout);
      handleSearchType_debounceTimeout = setTimeout(handleSearchTypeDebounced, 300);
    }

    async function handleSearchTypeDebounced() {
      const searchInstance = handleSearchType_debounceTimeout;
      const searchText = (dom.searchINPUT.value || '');
      if (searchText.length <= 2) {
        updateSearchMatches(searchText, []);
        return;
      }

      const bucket = await loadBucketFor(searchText);
      if (dom.searchINPUT.value !== searchText || handleSearchType_debounceTimeout !== searchInstance) return;

      const searchMatches = findSearchMatches(searchText, bucket);
      if (dom.searchINPUT.value !== searchText || handleSearchType_debounceTimeout !== searchInstance) return;

      updateSearchMatches(searchText, searchMatches);
    }

    /**
     * @param {string} searchText
     * @param {{ rank: number, shortDID: string, shortHandle: string, displayName: string | undefined }[]} searchMatches
     */
    function updateSearchMatches(searchText, searchMatches) {
      if (!searchMatches.length) {
        if (dom.searchINPUT.autocompleteDIV)
          dom.searchINPUT.autocompleteDIV.style.display = 'none';

        return;
      }

      if (!dom.searchINPUT.autocompleteDIV) {
        dom.searchINPUT.autocompleteDIV = elem('div', {
          className: 'autocomplete',
          parent: dom.searchPane
        });
      } else {
        dom.searchINPUT.autocompleteDIV.style.display = 'block';
      }

      const selectedShortDID = getInputSelectionShortDID(dom.searchINPUT);

      dom.searchINPUT.autocompleteDIV.innerHTML = '';
      for (const match of searchMatches) {
        const matchElem = elem('div', {
          className: 'autocomplete-item',
          parent: dom.searchINPUT.autocompleteDIV,
          children: [
            elem('span', { className: 'autocomplete-item-at', textContent: '@' }),
            elem('span', { className: 'autocomplete-item-handle', textContent: match.shortHandle }),
            match.displayName &&
              elem('span', { className: 'autocomplete-item-displayName', textContent: match.displayName }),
          ]
        });
        /** @type {*} */(matchElem).shortDID = match.shortDID;
        /** @type {*} */(matchElem).shortHandle = match.shortHandle;
        if (match.shortDID === selectedShortDID) matchElem.classList.add('selected');

        matchElem.onclick = () => {
          navigateToSearchAccount(match.shortDID, match.shortHandle, match.displayName);
        };
      }
    }

    /** @param {string} searchText */
    function textSearcher(searchText) {
      const mushMatch = new RegExp([...searchText.replace(/[^a-z0-9]/gi, '')].join('.*'), 'i');
      const mushMatchLead = new RegExp('^' + [...searchText.replace(/[^a-z0-9]/gi, '')].join('.*'), 'i');

      const searchWordRegExp = new RegExp(
        searchText.split(/\s+/)
          // sort longer words match first
          .sort((w1, w2) => w2.length - w1.length || (w1 > w2 ? 1 : w1 < w2 ? -1 : 0))
          // generate a regexp out of word
          .map(word => '(' + word.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + ')')
          .join('|'),
        'gi');

      return matchRank;

      /** @param {string} matchText @param {boolean=} startOnly */
      function matchRank(matchText, startOnly) {
        let rank = 0;
        searchWordRegExp.lastIndex = 0;
        while (true) {
          const match = searchWordRegExp.exec(matchText);
          if (!match) break;
          rank += (match[0].length / matchText.length);
          if (match.index === 0) rank += 3;
        }

        if (mushMatch.test(matchText)) rank += 0.03;
        if (mushMatchLead.test(matchText)) rank += 0.05;

        return rank;
      }
    }

    /**
     * @param {string} searchText
     * @param {{ [shortDID: string]: string | [shortHandle: string, displayName: string] }} bucket 
     */
    function findSearchMatches(searchText, bucket) {
      const textSearcherFn = textSearcher(searchText);

      const searchMatches = [];
      for (const shortDID in bucket) {
        let rank = 0;
        let shortHandle = bucket[shortDID];
        let fullHandle = unwrapShortHandle(shortHandle);
        let displayName;
        if (Array.isArray(shortHandle)) {
          displayName = shortHandle[1];
          shortHandle = shortHandle[0];
        }

        if (displayName) {
          rank += textSearcherFn(displayName) * 20;
        }

        rank += textSearcherFn(fullHandle) * 30;

        if (rank)
          searchMatches.push({ rank, shortDID, shortHandle, displayName})
      }

      searchMatches.sort((a, b) => b.rank - a.rank || a.shortDID.localeCompare(b.shortDID));
      return searchMatches;
    }

    function loadBucketFor(handleOrSearch) {
      const first2Letters = getHandleBucket(handleOrSearch);
      return loadJsonp('../receipts-db/' + first2Letters + '.js');
    }

    function navigateToSearchAccount(shortDID, shortHandle, displayName) {
      history.pushState({}, '', '?handle=' + shortHandle);

      displaySearchResultsFor(shortDID, shortHandle, displayName);
    }

    /** @type {{ [shortDID: string]: { fetchMore(): Promise, posts: any[] }}} */
    var postsByDID;

    async function displaySearchResultsFor(shortDID, shortHandle, displayName) {

      async function initialLoad() {
        dom.searchPane.style.display = 'none';
        dom.closeLink.style.display = 'block';
        if (dom.searchINPUT.autocompleteDIV) {
          dom.searchINPUT.autocompleteDIV.style.display = 'none';
          dom.searchINPUT.autocompleteDIV.innerHTML = '';
        }
        dom.searchINPUT.value = '';

        dom.statsPane.innerHTML = '';
        elem('div', {
          textContent:
            shortHandle ? unwrapShortHandle(shortHandle) + '...' :
              shortDID ? unwrapShortDID(shortDID) + '...' :
                '...',
          paddingLeft: '4em',
          opacity: '0.8',
          parent: dom.statsPane
        });

        const bucket = await loadBucketFor(shortHandle || shortDID);
        const searchMatches = bucket && findSearchMatches(shortHandle || shortDID, bucket);
        if (!searchMatches?.length) {
          displaySearchPage(shortHandle || (shortDID ? unwrapShortDID(shortDID) : ''));
          return;
        }

        shortDID = searchMatches[0].shortDID;
        shortHandle = searchMatches[0].shortHandle;
        displayName = searchMatches[0].displayName;

      }

      async function loadWithConfirmedArgs() {
        dom.statsPane.textContent = '';

        /** @type {HTMLElement} */
        let avatarElem;
        /** @type {HTMLElement} */
        let handleElem;

        /** @type {HTMLElement} */
        let didElem;

        const titleLine = elem('div', {
          parent: dom.statsPane,
          className: 'title',
          children: [
            avatarElem = elem('span', {
              className: 'avatar',
              textContent: '@'
            }),
            ' ',
            handleElem = elem('span', {
              className: 'handle',
              textContent: shortHandle,
              children: unwrapShortHandle(shortHandle) !== shortHandle && [
                elem('span', {
                  className: 'bsky.social',
                  textContent: '.bsky.social'
                })
              ] || undefined
            }),
            ' ',
            didElem = elem('span', {
              className: 'did',
              children: [
                unwrapShortDID(shortDID) !== shortDID && elem('span', {
                  className: 'did-prefix',
                  textContent: 'did:plc:'
                }) || undefined,
                shortDID
              ]
            })
          ]
        });

        const bioElem = elem('pre', {
          className: 'bio',
          textContent: 'bio...',
          parentElement: dom.statsPane,
        });

        updateAvatarAndBio();

        return {
          titleLine,
          avatar: avatarElem,
          handle: handleElem,
          did: didElem,
          bio: bioElem
        };

        async function updateAvatarAndBio() {
          const atClient = new atproto_api.BskyAgent({ service: 'https://bsky.social/xrpc' });
          const profile = await atClient.com.atproto.repo.listRecords({
            collection: 'app.bsky.actor.profile',
            repo: unwrapShortDID(shortDID)
          });
          /** @type {*} */
          const profileRec = profile.data.records?.filter(rec => rec.value)[0]?.value;
          const avatarCid = profileRec?.avatar?.ref?.toString();
          const avatarUrl = avatarCid && 'https://bsky.social/xrpc/com.atproto.sync.getBlob?did=' + unwrapShortDID(shortDID) + '&cid=' + avatarCid;
          const bannerCid = profileRec?.banner?.ref?.toString();
          const bannerUrl = bannerCid && 'https://bsky.social/xrpc/com.atproto.sync.getBlob?did=' + unwrapShortDID(shortDID) + '&cid=' + bannerCid;
          const displayName = profileRec?.displayName;
          const description = profileRec?.description;

          dom.titleH2.textContent = displayName;
          if (avatarUrl) {
            avatarElem.innerHTML = '';
            elem('img', {
              className: 'avatar-image',
              src: avatarUrl,
              parent: avatarElem,
            });
          }
          if (bannerUrl) {
            dom.banner.style.backgroundImage = 'url(' + bannerUrl + ')';
          }

          if (description) {
            bioElem.textContent = description;
          }
        }
      }

      /**
       * @typedef {import('./lib/node_modules/@atproto/api').AppBskyFeedPost.Record & {
       *  uri: string,
       *  dom?: HTMLElement
       * }} PostRecord
       */

      async function startFetchingPosts() {
        if (!postsByDID) postsByDID = {};
        const fetcher = postsByDID[shortDID] || (postsByDID[shortDID] = createHistoryFetcher(shortDID));

        fetcher.fetchMore();
        initSearchUserExperience(fetcher);
      }

      /** @param {ReturnType<typeof createHistoryFetcher>} fetcher */
      function initSearchUserExperience(fetcher) {

        dom.resultsPane.innerHTML = '';

        /** @type {HTMLInputElement} */
        let postSearchINPUT;
        /** @type {HTMLElement} */
        let postSearchClear;
        const searchPanelElem = elem('div', {
          className: 'search-panel',
          parent: dom.resultsPane,
          children: [
            postSearchINPUT = elem('input', {
              className: 'post-search-input',
            }),
            postSearchClear = elem('span', {
              className: 'post-search-clear',
              innerHTML: '&times;',
            })
          ]
        });

        const postList = elem('div', {
          className: 'post-list',
          parent: dom.resultsPane
        });

        /** @type {PostRecord[]} */
        const postCache = [];
        /** @type {{ [uri: string]: PostRecord}} */
        const postCacheByUri = {};

        postSearchINPUT.oninput = handlePostSeachType;
        postSearchINPUT.onkeydown = handlePostInputKeydown;
        postSearchINPUT.onkeyup = handlePostSeachType;
        postSearchINPUT.onchange = handlePostSeachType;

        postSearchClear.onmousedown = (e) => {
          e.preventDefault();
          postSearchINPUT.value = '';
        };

        dom.resultsPane.onscroll = handleScroll;

        reflectRecords();
        fetcher.fetchMore().then(() => {
          reflectRecords();
        });

        var postSearchTypeDebounce;
        function handlePostSeachType() {
          clearTimeout(postSearchTypeDebounce);
          postSearchTypeDebounce = setTimeout(handlePostSeachTypeDebounced, 300);
        }

        function handlePostSeachTypeDebounced() {
          reflectRecords();
        }

        /** @param {KeyboardEvent} e */
        function handlePostInputKeydown(e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            clearTimeout(postSearchTypeDebounce);
            handlePostSeachTypeDebounced();
          } else if (e.keyCode === 27) {
            e.preventDefault();
            postSearchINPUT.value = '';
          }
        }

        var delayScrollHandler;
        function handleScroll() {
          if (delayScrollHandler) return;
          delayScrollHandler = setTimeout(() => {
            delayScrollHandler = 0;

            handleScrollCore();
          }, 20);
        }

        function handleScrollCore() {
          const scrollBottom = dom.resultsPane.scrollTop + dom.resultsPane.clientHeight;
          const scrollBottomThreshold = dom.resultsPane.scrollHeight - 200;
          if (scrollBottom < scrollBottomThreshold) return;

          fetcher.fetchMore().then(() => {
            reflectRecords();
          });
        }

        function reflectRecords() {
          // deduplicate
          for (const post of fetcher.posts) {
            let postEntry = postCacheByUri[post.uri];
            if (postEntry) continue;
            postEntry = postCacheByUri[post.uri] = post;
            postCache.push(postEntry);
          }

          const searchResult = findMatchingPosts(postSearchINPUT.value, postCache);

          for (let i = 0; i < searchResult.length; i++) {
            const post = searchResult[i];
            if (!post.dom) post.dom = renderPost(post);
            if (postList.children[i]) {
              postList.insertBefore(post.dom, postList.children[i]);
            } else {
              postList.appendChild(post.dom);
            }
          }

          while (postList.children.length > searchResult.length) {
            postList.removeChild(postList.children[postList.children.length - 1]);
          }

          handleScrollCore();
        }
        
        /**
         * @param {string} searchText
         * @param {PostRecord[]} posts
         */
        function findMatchingPosts(searchText, posts) {
          if (!(searchText || '').trim()) return posts;

          const textSearcherFn = textSearcher(searchText);
          const matches = [];
          for (const post of posts) {
            const rank = textSearcherFn(post.text);
            if (rank > 0.1) matches.push({ rank, post });
          }

          matches.sort((a, b) => b.rank - a.rank || a.post.uri.localeCompare(b.post.uri));
          const postsOnly = matches.map(m => m.post);

          return postsOnly;
        }
      }

      /**
       * @param {PostRecord} post
       */
      function renderPost(post) {
        const postUri = breakFeedUri(/** @type {string} */(post.uri));

        const postElem = elem('div', {
          className: 'post',
          children: [
            elem('div', {
              className: 'post-content',
              children: [
                elem('div', {
                  className: 'post-content-line-timestamp',
                  children: [
                    elem('a', {
                      href: postUri && 'https://bsky.app/profile/' + unwrapShortHandle(shortHandle) + '/post/' + postUri.postID,
                      textContent: new Date(post.createdAt).toLocaleString()
                    })
                  ]
                }),
                elem('div', {
                  className: 'post-content-line',
                  children: [
                    elem('span', {
                      className: 'post-content-line-text',
                      textContent: post.text
                    })
                  ]
                }),
                /** @type {*} */(post.embed?.images)?.length && elem('div', {
                  className: 'post-content-line',
                  children: [
                    elem('img', {
                      className: 'post-content-line-image',
                      src: 'https://bsky.social/xrpc/com.atproto.sync.getBlob?did=' + unwrapShortDID(shortDID) + '&cid=' + post.embed?.images[0].image.ref,
                    })
                  ]
                })
              ]
            })
          ]
        });

        return postElem;
      }

      function createHistoryFetcher(shortDID) {
        const atClient = new atproto_api.BskyAgent({ service: 'https://bsky.social/xrpc' });

        let fetchMorePromise;

        let cursor = undefined;
        const fetcher = {
          fetchMore,
          posts: /** @type {PostRecord[]} */([])
        };
        return fetcher;

        function fetchMore() {
          if (!fetchMorePromise) {
            fetchMorePromise = fetchMoreCore();
          }

          return fetchMorePromise
        }

        async function fetchMoreCore() {
          const posts = await atClient.com.atproto.repo.listRecords({
            collection: 'app.bsky.feed.post',
            repo: unwrapShortDID(shortDID),
            cursor
          });

          cursor = posts.data.cursor;

          for (const p of posts.data.records) {
            const combinePostAndRecord = {
              ...p,
              ...p.value
            };

            fetcher.posts.push(/** @type {*} */(combinePostAndRecord));
          }

          fetchMorePromise = undefined;
        }
      }

      await initialLoad();
      await loadWithConfirmedArgs();
      await startFetchingPosts();
    }

    function displaySearchPage(preloadSearchText) {
      dom.searchINPUT.oninput = handleSearchType;
      dom.searchINPUT.onkeydown = handleInputKeydown;
      dom.searchINPUT.onkeyup = handleSearchType;
      dom.searchINPUT.onchange = handleSearchType;

      dom.banner.style.backgroundImage = '';
      dom.closeLink.style.display = 'none';
      dom.titleH2.textContent = ' History search:';
      dom.statsPane.innerHTML = '';
      dom.searchPane.style.display = 'block';

      if (preloadSearchText) {
        dom.searchINPUT.value = preloadSearchText;
      }
    }

    function detectModeAndShow() {
      const urlParams = new URLSearchParams(window.location.search);
      const did = urlParams.get('did');
      const handle = urlParams.get('handle');
      dom.closeLink.style.display = 'block';
      dom.closeLink.onclick = () => {
        history.pushState({}, '', 'index.html');
        dom.resultsPane.textContent = 'Pick an account to search history.';
        displaySearchPage();
      };

      if (did || handle) {
        displaySearchResultsFor(did, handle, undefined);
      } else {
        displaySearchPage();
      }
    }


    const waitForLibrariesLoaded = new Promise((resolve) => {
      // @ts-ignore
      receipts = () => {
        resolve(undefined);
      }
    });

    /** @type {*} */(window).module = { exports: {}  };

    const dom = initSearchPageDOM();

    detectModeAndShow();

  }


  function runInLocalNodeScript() {
    const fs = require('fs');
    const path = require('path');
    require('./lib.js');

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
        saveBucket(bucket);
      }
      console.log('Saved ' + Object.keys(byFirst2Letters).length + ' buckets');
    }

    function saveBucket(bucket) {
      for (const shortDID in bucket) {
        let shortHandle = bucket[shortDID];
        if (Array.isArray(shortHandle)) shortHandle = shortHandle[0];
        if (!shortHandle) continue;

        const receiptsDbDir = path.resolve(__dirname, '../receipts-db');

        const first2Letters = getHandleBucket(shortHandle);
        const letterDir = path.resolve(receiptsDbDir, first2Letters.split('/')[0]);
        if (!fs.existsSync(letterDir)) fs.mkdirSync(letterDir);

        saveJsonp(
          path.resolve(receiptsDbDir, first2Letters + '.js'),
          '{\n' +
          Object.keys(bucket).map(shortDID =>
            JSON.stringify(shortDID) + ':' + JSON.stringify(bucket[shortDID]))
            .join(',\n') +
          '\n}');
        return;
      }
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
          byFirst2Letters[first2Letters.charAt(0) + '/' + first2Letters] = bucket;
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
          const batchStart = Date.now();
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
              const startCall = Date.now();
              let tryCount = 0;
              while (true) {
                try {
                  tryCount++;
                  const descr = await updateAccountInfo(repo.did);
                  console.log(' ' + JSON.stringify(descr));
                  break;
                } catch (error) {
                  if (tryCount > 6) {
                    console.log(' - falwed account, skip.');
                    console.log(error);
                    console.log('\n\n\n');
                    break;
                  }

                  process.stdout.write(
                    ' ' + (tryCount + 1) + ' ' +
                    /rate/i.test(error?.message || '') ? 'R ' :
                      error?.message);

                  const callTime = Date.now() - startCall;
                  const waitTime = (Math.random() * 0.5 + 0.5) * Math.max(callTime, 5000);
                  await new Promise(resolve => setTimeout(resolve, waitTime));
                }
              }
            }

            process.stdout.write('Saving ' + saveBuckets.length + ' buckets...');
            for (const first2Letters of saveBuckets) {
              const bucket = byFirst2Letters[first2Letters];
              saveBucket(bucket);
            }
            process.stdout.write(' cursors...');
            fs.writeFileSync(path.join(__dirname, '../receipts-db/cursor.json'), JSON.stringify({ listRepos: { cursor: nextList.data.cursor, time: Date.now() } }, null, 2));
            console.log(' OK');
          }
          const batchEndTime = Date.now();
          console.log('  ' + (batchEndTime - batchStart) / 1000 + 's, ' + (nextList.data?.repos?.length || 0) / (batchEndTime - batchStart) * 1000  + ' per second\n\n');


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

        const existingDescr = allUsers[shortDID];
        if (existingDescr === descr) return ['----NOOP----', existingDescr];
        if (Array.isArray(existingDescr) && Array.isArray(descr)
          && existingDescr.length === descr.length
          && !existingDescr.some((x, i) => x !== descr[i])) return ['    NOOP    ', ...existingDescr];

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
    return !shortDID ? shortDID : shortDID.indexOf(':') < 0 ? 'did:plc:' + shortDID : shortDID;
  }

  function unwrapShortHandle(shortHandle) {
    return !shortHandle ? shortHandle : shortHandle.indexOf('.') < 0 ? shortHandle + '.bsky.social' : shortHandle;
  }

  /** @param {string} handle */
  function shortenHandle(handle) {
    return handle && handle.replace(_shortenHandle_Regex, '');
  }
  const _shortenHandle_Regex = /\.bsky\.social$/;

  /**
 * @param {string=} uri
 */
  function breakFeedUri(uri) {
    if (!uri) return;
    const match = _breakFeedUri_Regex.exec(uri);
    if (!match || !match[3]) return;
    return { shortDID: match[2], postID: match[3] };
  }
  const _breakFeedUri_Regex = /^at\:\/\/(did:plc:)?([a-z0-9]+)\/[a-z\.]+\/?(.*)?$/;

  /** @param {string} path */
  function jsonpFuncName(path) {
    return /** @type {string} */(path.split(/[/\\]/g).pop())
      .replace(/\.js$/, '')
      .replace(/[^a-z0-9]/ig, '')
      .replace(/^([0-9]|do|if|in)/ig, '_$1');
  }

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
