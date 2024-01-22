// @ts-check
/// <reference path="./lib/decl.d.ts" />

function receipts() {
  function runInBrowser() {
    var atClient;

    let overrideLang =
      /ua/i.test(location.host || '') || /ua/i.test(window.name || '') ||
      (navigator.languages || []).some(lang => /ru/i.test(lang || '')) ? 'ua' :
        undefined;
    
    if (overrideLang === 'ua') {
      document.title = 'BlueSky пошук по історії';
    }

    function initSearchPageDOM() {
      const host = elem('div', {
        id: 'receiptsHost',
        innerHTML: `
<div class=banner>
</div>
<div class=titlePane>
  <h2> ${overrideLang === 'ua' ? 'Пошук в історії:' : 'History search:'} </h2>
</div>
<div class=searchPane>
  <input id=searchINPUT placeholder='${overrideLang === 'ua' ? 'Кого шукаємо?' : 'Who are we talking about?'}'>
</div>
<div class=statsPane>
</div>
<div class=closeLink></div>
<div class=resultsPane>
<div style="padding: 1em;">
  ${
          overrideLang === 'ua' ? 
          'Пошук активності акаунтів BluSki, користуйтеся для розшуку чи перевірки людини.' :
          'Searching BlueSky activity of a user: to verify their identity, and to find their receipts.'
  }
  
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

@media (max-width: 800px) {
  #receiptsHost {
    position: relative;
    min-height: 100%;
    overflow: inherit;
  }
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
  padding: 0.1em 0.5em 0.2em .20em;
  cursor: default;
}

.searchPane .autocomplete .autocomplete-item .autocomplete-item-at {
  opacity: 0.7;
  font-weight: 300;
  margin-right: 0.12em;
  display: inline-block;
  width: 1.3em;
  text-align: right;
  position: relative;
  top: 0.1em;
}

.searchPane .autocomplete .autocomplete-item .bsky-social {
  color: #587dc0;
}

.searchPane .autocomplete .autocomplete-item .autocomplete-item-displayName {
  padding-left: 0.5em;
  zoom: 0.8;
  transform: scaleY(1.15) translateY(-0.07em);
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
  background: white;

  position: sticky;
  top: 0;
}

.statsPane .title {
  padding: 1em 1em 0 1em;
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

.statsPane .bsky-social {
  color: #587dc0;
  zoom: 0.9;
  transform: scaleY(1.14) translateY(-0.04em);
  transform-origin: left;
  display: inline-block;
}

.statsPane .did {
  font-size: 90%;
  opacity: 0.8;
  display: block;
}

.statsPane .did .did-prefix {
  opacity: 0.6;
}

.bio {
  padding: 0;
  margin: 0;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  line-height: 1;
  font-family: inherit;
}

@media (max-width: 800px) {
  .bio {
    grid-row: 5;
    grid-column: 1;
  }
}

.resultsPane {
  grid-row-start: 1;
  grid-row-end: 7;
  grid-column: 2;
  overflow: auto;

  border-left: solid 1px #d4d4d4;
  box-shadow: inset 3px 0px 8px #00000021;
}

@media (max-width: 800px) {
  .resultsPane {
    grid-row: 6;
    grid-column: 1;
    overflow: visible;
  }
}

.resultsPane .post-list {
  padding: 1em 0.5em 1em 1em;
}

.resultsPane .post-list .post {
  padding: 0.5em 0 2em 0;
  margin-bottom: 2em;
  border-bottom: dotted 2px #e2e2e2;
}

.resultsPane .post-list .post.injected-parent {
  margin-left: 3em;
  font-size: 80%;
  border-left: solid 1px cornflowerblue;
  margin-bottom: 0;
  padding-left: 0.5em;
  padding-bottom: 1em;
  border-bottom: solid 1px #9cbfff;
}

.resultsPane .post-list .post.injected-parent:first-child {
  border-top: solid 1px cornflowerblue;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.resultsPane .post-list .post-content-expand-thread-above {
  display: inline-block;
  font-size: 86%;
  padding: 0.2em 0.5em;
  border: solid 1px #c0d3f6;
  border-radius: 0.4em;
  color: cornflowerblue;
  background: #edf4ff;
  cursor: pointer;
}

.resultsPane .post-list .post-content-expand-thread-above.expanded {
  cursor: default;
  display: block;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  margin-right: -0.6em;
  padding-left: 1em;
  background: white;
  color: gray;
  border-color: cornflowerblue;
  margin-top: -1px;
}

.resultsPane .post-list .post .post-content-line-timestamp.asreply {
  padding-left: 0.6em;
}

.resultsPane .post-list .post .post-content-line-timestamp a {
  color: royalblue;
  text-decoration: none;
}
.resultsPane .post-list .post .post-content-line-timestamp a:hover {
  text-decoration: underline;
}

.resultsPane .post-list .post .post-content-line.asreply {
  padding-left: 0.6em;
}

.resultsPane .post-list .post .post-content-line-avatar {
  display: inline-block;
  float: left;
  width: 2.5em;
  height: 2.5em;
  margin-top: 0.25em;
  margin-right: 0.65em;
  margin-bottom: 0.25em;
  background: silver;
  border-radius: 200%;
}

.resultsPane .post-list .post .post-content-line-avatar.loaded {
  background: none;
  border-radius: none;
}

.resultsPane .post-list .post .post-content-line-avatar.loaded img {
  width: 2.5em;
  height: 2.5em;
  border-radius: 200%;
}

.resultsPane .post-list .post .post-content-line-handle {
  font-weight: bold;
  padding-right: 0.5em;
}

.resultsPane .post-list .post .post-content-line-text {
  padding-top: 0.25em;
  white-space: pre-wrap;
}

.resultsPane .post-list .post .post-content-line-text .post-content-line-text-highlight {
  background: gold;
  border-radius: 0.3em;
  padding: 0 0.1em;
  margin: 0 -0.1em;
}

.resultsPane .post-list .post .post-content-line-text .post-content-line-text-light-highlight {
  background-image: linear-gradient(to top, #ffcd70, transparent 0.6em);
  border-radius: 0.2em;
}

.resultsPane .post-list .post .post-content-line-image {
  max-width: 20em;
  display: block;
  clear: both;
}

.resultsPane .post-list .post .post-content-line-image-alt {
  max-width: 60%;
  float: right;
  font-size: 90%;
  background: #fff7ce;
  padding: 0.25em 0.7em;
  border: solid 1px #c7b554;
  margin: 0.5em 0;
}

.resultsPane .post-list .post-list-continue {
  color: gray;
  font-style: italic;
  animation: colorcycle 4s infinite;
}

.resultsPane .post-list .post-list-end {
  color: gray;
  font-weight: bold;
  font-style: italic;
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

@media (max-width: 800px) {
  .resultsPane .search-panel {
    top: 6em;
  }
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

@keyframes colorcycle {
  0%    { opacity: 1; }
  25%   { opacity: 0.5; color: #0044b5; }
  50%   { opacity: 1; }
  75%   { opacity: 0.6; color: #ff6600; }
  100%  { opacity: 1; }
}


@media (max-width: 800px) {
  #receiptsHost {
    grid-template-rows: 1fr auto auto auto auto 10fr;
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

  .statsPane .bio {
    max-height: 9em;
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
   *  Omit<Partial<HTMLElement['style']> & Partial<HTMLElementTagNameMap[TagName]>, 'children' | 'parent' | 'parentElement' | 'style'> &
   *  {
   *    children?: (Element | string | null | void | undefined)[] | Element | string | null | void | undefined,
   *    parent?: Element | null, 
   *    parentElement?: Element | null,
   *    style?: string | Partial<HTMLElement['style']>
   *  })=} [style]
   * @returns {HTMLElementTagNameMap[TagName]}
   * @template {string} TagName
   */
  function elem(tagName, style) {
    var el = document.createElement(tagName);

    if (style && typeof /** @type {*} */(style).appendChild === 'function') {
      var tmp = parent;
      style = /** @type {*} */(parent);
      parent = tmp;
    }

    if (typeof style === 'string') {
      if (/** @type{*} */(style).indexOf(':') >= 0) el.style.cssText = style;
      else el.className = style;
    }
    else if (style) {
      /** @type {Element | undefined} */
      var setParent;
      /** @type {Element[] | undefined} */
      var appendChildren;
      for (var key in style) {
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
        for (const child of Array.isArray(appendChildren) || /** @type {*} */(appendChildren).length > 0 ? appendChildren : [appendChildren]) {
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


    function getInputSelectedItem(searchINPUT) {
      if (!searchINPUT.autocompleteDIV) return;
      const items = [...searchINPUT.autocompleteDIV.querySelectorAll('.autocomplete-item')];
      for (const item of items) {
        if (item.classList.contains('selected')) return item;
      }
    }

    /** @param {KeyboardEvent} e */
    function handleAccountSearchInputKeydown(e) {
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

        const selectedShortDID = getInputSelectedItem(dom.searchINPUT)?.shortDID;
        const selectedIndex = items.findIndex(item => /** @type {*} */(item).shortDID === selectedShortDID);

        const nextSelectedIndex = selectedIndex < 0 ?
          (direction > 0 ? 0 : items.length - 1) :
          Math.max(0, Math.min(items.length - 1, selectedIndex + direction));

        if (nextSelectedIndex !== selectedIndex) {
          items[selectedIndex]?.classList.remove('selected');
          items[nextSelectedIndex]?.classList.add('selected');
        }
      }

      async function acceptSelection() {
        const items = [...(
          !/none/i.test(dom.searchINPUT.autocompleteDIV?.style?.display || '') &&
          dom.searchINPUT.autocompleteDIV?.querySelectorAll('.autocomplete-item') || [])];

        const inputSelectedItem = getInputSelectedItem(dom.searchINPUT);

        let navToShortDID = inputSelectedItem?.shortDID;
        let navToShortHandle = inputSelectedItem?.shortHandle;

        if (!navToShortDID) {
          const topItem = /** @type {*} */(items[0]);
          if (topItem?.shortDID && topItem?.rank > 20) {
            navToShortDID = topItem.shortDID;
            navToShortHandle = topItem.shortHandle;
          } else if (likelyDID(dom.searchINPUT.value)) {
            navToShortDID = dom.searchINPUT.value;
          } else {
            const acceptSelectionInputValue = dom.searchINPUT.value;
            let resolved;
            try {
              resolved = await atClient.com.atproto.identity.resolveHandle({ handle: unwrapShortHandle(acceptSelectionInputValue) });
            } catch (error) {
              return;
            }

            if (!resolved.data.did || dom.searchINPUT.value !== acceptSelectionInputValue)
              return;

            navToShortHandle = acceptSelectionInputValue;
            navToShortDID = resolved.data.did;
          }
        }

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

      const searchMatches = await findSearchMatches(searchText, bucket);
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

      const selectedShortDID = getInputSelectedItem(dom.searchINPUT);

      dom.searchINPUT.autocompleteDIV.innerHTML = '';
      const MAX_MATCH_COUNT = 100;
      let matchCount = 0;
      for (const match of searchMatches) {
        if (matchCount > MAX_MATCH_COUNT) break;
        matchCount++;

        let autcompleteItemAt;
        const matchElem = elem('div', {
          className: 'autocomplete-item',
          children: [
            autcompleteItemAt = elem('span', { className: 'autocomplete-item-at', textContent: '@' }),
            elem('span', { className: 'autocomplete-item-handle', textContent: match.shortHandle }),
            match.shortHandle === unwrapShortHandle(match.shortHandle) ? undefined :
              elem('span', { className: 'bsky-social', textContent: '.bsky.social' }),
            match.displayName &&
              elem('span', { className: 'autocomplete-item-displayName', textContent: match.displayName }),
          ]
        });

        for (const key in match) if (!(key in matchElem)) {
          matchElem[key] = match[key];
        }

        if (match.shortDID === selectedShortDID) matchElem.classList.add('selected');

        matchElem.onclick = () => {
          navigateToSearchAccount(match.shortDID, match.shortHandle, match.displayName);
        };

        const profileDetailsOrPromise = getProfileDetailsByShortDID(match.shortDID);
        if (isPromise(profileDetailsOrPromise)) {
          profileDetailsOrPromise.then(profileDetails => replaceAtWithAvatar(autcompleteItemAt, profileDetails));
        } else {
          replaceAtWithAvatar(autcompleteItemAt, profileDetailsOrPromise, true);
        }

        dom.searchINPUT.autocompleteDIV.appendChild(matchElem);
      }

      /**
       * @param {HTMLElement} autocompleteItemAt
       * @param {Partial<ProfileDetailsEntry>} profileDetails
       * @param {boolean=} skipDeletionCheck
       */
      function replaceAtWithAvatar(autocompleteItemAt, profileDetails, skipDeletionCheck) {
        if (!profileDetails.avatarUrl) return;

        if (!skipDeletionCheck) {
          let ultimateParent = autocompleteItemAt;
          while (!/body/i.test(ultimateParent.tagName)) {
            if (!ultimateParent.parentElement) return;
            ultimateParent = ultimateParent.parentElement;
          }
        }

        autocompleteItemAt.style.background = 'no-repeat center center';
        autocompleteItemAt.style.backgroundSize = 'cover';
        autocompleteItemAt.style.backgroundImage = 'url(' + profileDetails.avatarUrl + ')';
        autocompleteItemAt.style.color = 'transparent';
        autocompleteItemAt.style.opacity = '1';
        autocompleteItemAt.style.borderRadius = '200%';
      }
    }

    function likelyDID(text) {
      return text && (
        !text.trim().indexOf('did:') ||
        text.trim().length === 24 && !/[^\sa-z0-9]/i.test(text)
      );
    }

    var directDIDMatches;

    /**
     * @param {string} searchText
     * @param {{ [shortDID: string]: string | [shortHandle: string, displayName: string] }} bucket 
     */
    function findSearchMatches(searchText, bucket) {
      if (likelyDID(searchText)) {
        const shortDID = shortenDID(searchText.trim().toLowerCase()) || '';

        if (directDIDMatches && directDIDMatches[shortDID]) return directDIDMatches[shortDID];

        if (!directDIDMatches) directDIDMatches = {};

        return directDIDMatches[shortDID] = (async () => {
          await waitForLibrariesLoaded;
          const describePromise = atClient.com.atproto.repo.describeRepo({
            repo: unwrapShortDID(shortDID)
          });
          const profilePromise = atClient.com.atproto.repo.listRecords({
            collection: 'app.bsky.actor.profile',
            repo: unwrapShortDID(shortDID)
          });

          const [describe, profile/*, blocks*/] = await Promise.all([describePromise, profilePromise/*, blocksPromise*/]);

          const shortHandle = shortenHandle(describe.data?.handle);
          const displayName = profile.data.records.map(rec => /** @type {*} */(rec.value).displayName).filter(d => d)[0];

          return directDIDMatches[shortDID] = [{
            rank: 0,
            shortDID,
            shortHandle,
            displayName
          }];
        })();
      }

      const textSearcherFn = textSearcher(searchText);

      const searchMatches = [];
      for (const shortDID in bucket) {
        let rank = 0;
        let shortHandle = bucket[shortDID];
        let displayName;
        if (Array.isArray(shortHandle)) {
          displayName = shortHandle[1];
          shortHandle = shortHandle[0];
        }
        let fullHandle = unwrapShortHandle(shortHandle);

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
      const lead = /ua/i.test(location.host || '') ?
          '//mihailik.github.io/' :
          '../';
      return loadJsonp(lead + 'receipts-db/' + first2Letters + '.js');
    }

    function navigateToSearchAccount(shortDID, shortHandle, displayName) {
      if (directDIDMatches?.[shortDID]) {
        history.pushState({}, '', '?did=' + unwrapShortDID(shortDID));
        displaySearchResultsFor(shortDID, undefined, displayName);
      } else {
        history.pushState({}, '', '?handle=' + unwrapShortHandle(shortHandle));
        displaySearchResultsFor(shortDID, shortHandle, displayName);
      }
    }

    /** @type {{ [shortDID: string]: ReturnType<typeof createHistoryFetcher>}} */
    var postsByShortDID;

    /**
     * @typedef {{
     *  shortDID: string;
     *  shortHandle: string;
     *  avatarUrl: string | undefined;
     *  bannerUrl: string | undefined;
     *  displayName: string | undefined;
     *  description: string | undefined;
     * }} ProfileDetailsEntry
     */

    /** @type {{ [shortDID: string]: ProfileDetailsEntry | Promise<ProfileDetailsEntry> }} */
    var profileDetailsByShortDID;

    async function displaySearchResultsFor(shortDID, shortHandle, displayName, searchString) {
      if (shortDID)
        shortDID = (shortenDID(shortDID) || '').toLowerCase();
      if (shortHandle)
        shortHandle = shortHandle.toLowerCase();

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

        const bucket = shortHandle ? await loadBucketFor(shortHandle || '') : {};

        await waitForLibrariesLoaded;

        if (shortHandle) {
          // search for exact match, most of times it will land here

          const matchShortHandle = shortenHandle(shortHandle); // normalizing the input explicitly before matching

          for (const pickShortDID in bucket) {
            let pickShortHandle = bucket[pickShortDID];
            let pickDisplayName;
            if (Array.isArray(pickShortHandle)) {
              pickDisplayName = pickShortHandle[1];
              pickShortHandle = pickShortHandle[0];
            }

            if (pickShortHandle === matchShortHandle) {
              shortDID = pickShortDID;
              shortHandle = pickShortHandle;
              displayName = pickDisplayName;
              return;
            }
          }

          try {
            const resolved = await atClient.com.atproto.identity.resolveHandle({ handle: unwrapShortHandle(shortHandle) });
            if (resolved.data.did) {
              shortDID = shortenDID(resolved.data.did);
              return;
            }
          } catch (err) {}
        }

        const searchMatches = bucket && await findSearchMatches(shortHandle || shortDID, bucket);
        if (!searchMatches?.length) { // if score too bad, flip out too
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
                  className: 'bsky-social',
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
          const profileDetails = await getProfileDetailsByShortDID(shortDID);

          dom.titleH2.textContent = profileDetails.displayName;
          if (profileDetails?.avatarUrl) {
            avatarElem.innerHTML = '';
            elem('img', {
              className: 'avatar-image',
              src: profileDetails.avatarUrl,
              parent: avatarElem,
            });
          }
          if (profileDetails?.bannerUrl) {
            dom.banner.style.backgroundImage = 'url(' + profileDetails.bannerUrl + ')';
          }

          bioElem.textContent = profileDetails?.description || '<empty bio>';
        }
      }

      async function startFetchingPosts() {
        if (!postsByShortDID) postsByShortDID = {};
        const fetcher = postsByShortDID[shortDID] || (postsByShortDID[shortDID] = createHistoryFetcher(shortDID));

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
              value: searchString
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
          if (directDIDMatches?.[shortDID]) {
            history.replaceState({}, '', '?did=' + shortDID + '&q=' + encodeURIComponent(postSearchINPUT.value));
          } else {
            history.replaceState({}, '', '?handle=' + shortHandle + '&q=' + encodeURIComponent(postSearchINPUT.value));
          }
          reflectRecords();
          fetcher.fetchMore().then(() => {
            reflectRecords();
          });
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

        var lastRenderedPostCacheCount;
        function reflectRecords() {
          // deduplicate
          for (const post of fetcher.posts) {
            let postEntry = postCacheByUri[post.uri];
            if (postEntry) continue;
            postEntry = postCacheByUri[post.uri] = post;
            postCache.push(postEntry);
          }

          const searchResult = findMatchingPosts(postSearchINPUT.value, postCache);

          let anyNew = lastRenderedPostCacheCount !== postCache.length;
          lastRenderedPostCacheCount = postCache.length;

          for (let i = 0; i < searchResult.length; i++) {
            const { post, rank, textHighlights, textLightHighlights } = searchResult[i];
            if (!post.dom || post.textHighlights !== textHighlights || post.textLightHighlights !== textLightHighlights) {
              post.dom = renderPost({ post, textHighlights, textLightHighlights });
              post.textHighlights = textHighlights;
              post.textLightHighlights = textLightHighlights;
            }

            if (postList.children[i] === post.dom) continue;

            if (postList.children[i]) {
              postList.insertBefore(post.dom, postList.children[i]);
              anyNew = true;
            } else {
              postList.appendChild(post.dom);
              anyNew = true;
            }
          }

          while (postList.children.length > searchResult.length) {
            postList.removeChild(postList.children[postList.children.length - 1]);
          }

          if (fetcher.endReached) {
            postList.appendChild(elem('div', {
              className: 'post-list-end',
              textContent: searchResult.length + ' post' + (searchResult.length === 1 ? '' : 's'),
              onclick: () => {
                fetcher.fetchMore().then(() => {
                  reflectRecords();
                });
                reflectRecords();
              }
            }));
          } else {
            postList.appendChild(elem('div', {
              className: 'post-list-continue',
              textContent:
                overrideLang == 'ua' ?
                  (
                    searchResult.length + ' знайдено' +
                    ' (пошук поміж ' + postCache.length + ' твіт' + (postCache.length % 10 === 1 && postCache.length !== 11 ? 'у' : 'ів') + '...)'
                  ):
                  (
                    searchResult.length + ' match' + (searchResult.length === 1 ? '' : 'es') +
                  ' (searching amongst ' + postCache.length + ' post' + (postCache.length === 1 ? '' : 's') + '...)'
                  ),
              onclick: () => {
                fetcher.fetchMore().then(() => {
                  reflectRecords();
                });
                reflectRecords();
              }
            }));
          }

          if (anyNew) {
            handleScrollCore();
          }
        }
        
        /**
         * @param {string} searchText
         * @param {PostRecord[]} posts
         */
        function findMatchingPosts(searchText, posts) {
          if (!(searchText || '').trim()) return posts.map(post => ({ post, rank: 0, textHighlights: undefined, textLightHighlights: undefined }));

          const postEntries = posts.map(post => {
            const text = post.text;
            let alt;
            const images = /** @type {any[]} */(post.embed?.images);
            if (images?.length) {
              for (const img of images) {
                if (img.alt) {
                  if (alt) alt.push(img.alt);
                  else alt = [img.alt];
                }
              }
            }
            return { text, alt, post };
          });

          const searchTextLowercase = searchText.toLowerCase().trim();
          const searchWordsLowercase = searchTextLowercase.split(/\s+/).filter(w => w.length);
          const smallestWordLength = searchWordsLowercase.reduce((smallest, w) => Math.min(smallest, w.length), 3);

          const Fuse = fuse.default || /** @type {*} */(fuse).Fuse || fuse
          const fuseSearcher = new Fuse(postEntries, {
            keys: ['text', 'alt'],
            ignoreLocation: true,
            threshold: 0.2,

            fieldNormWeight: 0.1,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: smallestWordLength,
            findAllMatches: true,
            shouldSort: false
          });

          const searchEntries = fuseSearcher.search(searchText);
          const matches = [];
          for (const entry of searchEntries) {
            const rank = entry.score;
            if (typeof rank !== 'number' || rank > 0.4) continue;
            const post = entry.item.post;

            /** @type {string[] | undefined} */
            let textHighlights;
            let textLightHighlights;
            if (entry.matches?.length) {
              for (const match of entry.matches) {
                if (match.key === 'text') {
                  if (!textLightHighlights) {
                    textHighlights = [...entry.item.text].map(ch => ' ');
                    textLightHighlights = textHighlights.slice();
                  }

                  for (const [start,end] of match.indices) {
                    const highlightChunk = entry.item.text.slice(start, end + 1).trim();
                    const strongHighlight =
                      highlightChunk.toLowerCase().indexOf(searchTextLowercase) >= 0 ||
                      searchWordsLowercase.indexOf(highlightChunk.toLowerCase()) >= 0;

                    for (let i = start; i <= end; i++) {
                      textLightHighlights[i] = entry.item.text[i];
                      if (strongHighlight) /** @type {string[]} */(textHighlights)[i] = textLightHighlights[i];
                    }
                  }
                }
              }
            }

            matches.push({
              rank,
              post,
              textHighlights: textHighlights && textHighlights.join(''),
              textLightHighlights: textLightHighlights && textLightHighlights.join('')
            });
          }

          console.log('matches: ', matches, ' searchEntries: ', searchEntries);

          return matches;
        }
      }

      /**
       * @param {string} text
       * @param {((index: number) => string | false | null | undefined) | undefined} classAt
       */
      function renderTextWithHighlight(text, classAt) {
        if (!text || !classAt) return [text];

        const result = [];
        /** @type {string | undefined} */
        let clusterClass;
        let clusterStart = 0;
        for (let i = 1; i < text.length; i++) {
          const className = classAt(i);
          if (!i || className === clusterClass) continue;

          result.push(
            !clusterClass ?
              text.slice(clusterStart, i) :
              elem('span', {
                className: clusterClass,
                textContent: text.slice(clusterStart, i)
              }));
          clusterStart = i;
          clusterClass = className || undefined;
        }

        if (clusterStart < text.length) {
          result.push(
            !clusterClass ?
              text.slice(clusterStart) :
              elem('span', {
                className: clusterClass,
                textContent: text.slice(clusterStart)
              }));
        }

        return result;
      }

      function renderPostTime(time) {
        if (!time) return undefined;
        const dt = new Date(time);
        const dtTime = dt.getTime();
        const now = Date.now();
        if (now - dtTime < 1000 * 60) return elem('span', { title: dt.toLocaleString(),
          textContent: overrideLang === 'ua' ? 'зараз' : 'now' });
        else if (now - dtTime < 1000 * 60 * 60) return elem('span', { title: dt.toLocaleString(),
          textContent: Math.round((now - dtTime) / (1000 * 60)) +
            (overrideLang === 'ua' ? 'хв тому' : 'm ago') });
        else if (now - dtTime < 1000 * 60 * 60 * 24) return elem('span', { title: dt.toLocaleString(),
          textContent: Math.round((now - dtTime) / (1000 * 60 * 60)) +
            (overrideLang === 'ua' ? 'г тому' : 'h ago') });
        else if (now - dtTime < 1000 * 60 * 60 * 24 * 7) return elem('span', { title: dt.toLocaleString(),
          textContent: dt.toLocaleDateString() });
        else return dt.toLocaleString();
      }

      /**
       * @param {{
       *  post: import ('@atproto/api').AppBskyFeedPost.Record,
       *  textHighlights?: string,
       *  textLightHighlights?: string,
       * }} _
       */
      function renderPost({ post, textHighlights, textLightHighlights }) {
        const postUri = breakFeedUri(/** @type {string} */(post.uri));

        /** @type {HTMLElement} */
        let expandThreadAboveElement = /** @type {*} */(undefined);

        const postElem = renderPostCore({ post, withReply: post.reply, textHighlights, textLightHighlights });

        if (expandThreadAboveElement) {
          expandThreadAboveElement.onclick = toggleThreadAbove;
        }

        return postElem;

        var togglePromise;

        function toggleThreadAbove() {
          if (togglePromise) return togglePromise;

          expandThreadAboveElement.className += ' expanded';
          expandThreadAboveElement.onclick = null;
          let parentCount = 0;
          expandThreadAboveElement.textContent = 
            overrideLang === 'ua' ? 'попередні&hellip;⤵' : 'previous&hellip;⤵'

          togglePromise = (async () => {
            let prevElem = expandThreadAboveElement;
            let parent = post.reply?.parent;
            while (parent) {
              const uriEntity = breakFeedUri(parent.uri);
              if (!uriEntity) return;

              const postRecord = await atClient.com.atproto.repo.getRecord({
                repo: unwrapShortDID(uriEntity.shortDID),
                collection: 'app.bsky.feed.post',
                rkey: uriEntity.postID
              });

              /** @type {import('@atproto/api').AppBskyFeedPost.Record} */
              const parentPost = /** @type {*} */(postRecord.data.value);

              if (!parentPost) return;

              const parentPostElem = renderPostCore({
                post: parentPost,
                postShortDID: uriEntity.shortDID,
              });
              parentPostElem.className += ' injected-parent';
              expandThreadAboveElement.parentElement?.insertBefore(
                parentPostElem,
                prevElem);
              
              parentCount++;

              expandThreadAboveElement.textContent =
                overrideLang === 'ua' ? parentCount + ' ' + (parentCount % 10 === 1 && parentCount !== 11 ? 'попередній' : 'попередніх') + '⤵' :
                  parentCount + ' previous⤵';

              parent = parentPost.reply?.parent;
              prevElem = parentPostElem;
            }
          })().finally(() => {
            togglePromise = undefined;
          });
        }

        /**
         * @param {{
         *  post: import('@atproto/api').AppBskyFeedPost.Record,
         *  textHighlights?: string,
         *  textLightHighlights?: string,
         *  withReply?: unknown
         *  postShortDID?: string,
         * }} _
         */
        function renderPostCore({ post, withReply, postShortDID, textHighlights, textLightHighlights }) {
          /** @type {HTMLElement | undefined} */
          let loadAvatarElem;

          /** @type {HTMLElement | undefined} */
          let handleElem;

          const postElem = elem('div', {
            className: 'post',
            children: [
              elem('div', {
                className: 'post-content',
                children: [
                  withReply && (
                    expandThreadAboveElement = elem('div', {
                      className: 'post-content-expand-thread-above',
                      innerHTML: overrideLang === 'ua' ? '⤵тред&hellip;' : '⤵thread&hellip;'
                    })
                  ),
                  elem('div', {
                    className: 'post-content-line-timestamp' + (withReply ? ' asreply' : ''),
                    children: [
                      postShortDID && (loadAvatarElem = elem('span', {
                        className: 'post-content-line-avatar'
                      })),
                      postShortDID && (handleElem = elem('span', { className: 'post-content-line-handle' })),
                      elem('a', {
                        target: '_blank',
                        href: postUri && 'https://bsky.app/profile/' + unwrapShortHandle(shortHandle) + '/post/' + postUri.postID,
                        children: renderPostTime(post.createdAt)
                      })
                    ]
                  }),
                  elem('div', {
                    className: 'post-content-line' + (withReply ? ' asreply' : ''),
                    children: [
                      elem('span', {
                        className: 'post-content-line-text',
                        children: renderTextWithHighlight(
                          post.text,
                          !textHighlights && !textLightHighlights ? undefined :
                            (pos =>
                              textHighlights?.charCodeAt(pos) !== 32 ? 'post-content-line-text-highlight' :
                                textLightHighlights?.charCodeAt(pos) !== 32 ? 'post-content-line-text-light-highlight' :
                                  undefined)
                        )
                      })
                    ]
                  }),
                /** @type {*} */(post.embed?.images)?.length && elem('div', {
                  className: 'post-content-line' + (withReply ? ' asreply' : ''),
                    children: /** @type {*} */(post.embed?.images).map(img => elem('div', {
                      className: 'post-content-line-image-entry',
                      children: [
                        img.alt && elem('div', {
                          className: 'post-content-line-image-alt',
                          textContent: img.alt
                        }),
                        elem('img', {
                          className: 'post-content-line-image',
                          src: 'https://bsky.social/xrpc/com.atproto.sync.getBlob?did=' +
                            unwrapShortDID(postShortDID || shortDID) + '&cid=' + img.image.ref,
                        })
                      ]
                    }))
                  })
                ]
              })
            ]
          });

          if (loadAvatarElem) {
            (async () => {
              const profileDetails = await getProfileDetailsByShortDID(postShortDID);
              if (profileDetails?.avatarUrl) {
                loadAvatarElem.className += ' loaded';
                loadAvatarElem.appendChild(elem('img', {
                  src: profileDetails.avatarUrl
                }));
              }

              if (handleElem && (profileDetails?.displayName || profileDetails?.shortHandle)) {
                handleElem.textContent =
                  profileDetails.displayName ? profileDetails.displayName :
                    '@' + profileDetails.shortHandle;
              }
            })()
          }

          return postElem;
        }
      }

      await initialLoad();
      await loadWithConfirmedArgs();
      await startFetchingPosts();
    }

    /** @type {Set} */
    var throttleProfileOutstandingRequests;

    function getProfileDetailsByShortDID(shortDID) {
      if (!profileDetailsByShortDID) profileDetailsByShortDID = {};
      if (profileDetailsByShortDID[shortDID]) return profileDetailsByShortDID[shortDID];

      if (!throttleProfileOutstandingRequests) throttleProfileOutstandingRequests = new Set();

      return profileDetailsByShortDID[shortDID] = (async () => {
        const MAX_PROFILE_CONCURRENCY = 3;
        let anyWait = false;
        while (throttleProfileOutstandingRequests.size >= MAX_PROFILE_CONCURRENCY) {
          anyWait = true;
          try {
            await Promise.race(Array.from(throttleProfileOutstandingRequests));
          } catch (_err) { }
        }

        if (anyWait) await new Promise(resolve => setTimeout(resolve, 100));

        const retrievePromise = (async () => {

          const describePromise = atClient.com.atproto.repo.describeRepo({
            repo: unwrapShortDID(shortDID)
          });

          const profilePromise = atClient.com.atproto.repo.listRecords({
            collection: 'app.bsky.actor.profile',
            repo: unwrapShortDID(shortDID)
          });

          const [describe, profile] = await Promise.all([describePromise, profilePromise]);

          const shortHandle = shortenHandle(describe.data.handle);

          /** @type {*} */
          const profileRec = profile.data.records?.filter(rec => rec.value)[0]?.value;
          const avatarUrl = getBlobUrl(shortDID, profileRec?.avatar?.ref?.toString());
          const bannerUrl = getBlobUrl(shortDID, profileRec?.banner?.ref?.toString());
          const displayName = profileRec?.displayName;
          const description = profileRec?.description;

          const profileDetails = {
            shortDID,
            shortHandle,
            avatarUrl,
            bannerUrl,
            displayName,
            description
          };

          profileDetailsByShortDID[shortDID] = profileDetails;

          return profileDetails;
        })();

        throttleProfileOutstandingRequests.add(retrievePromise);
        retrievePromise.finally(() => {
          throttleProfileOutstandingRequests.delete(retrievePromise);
        });

        return await retrievePromise;
      })();
    }

    /**
     * @typedef {import('@atproto/api').AppBskyFeedPost.Record & {
     *  uri: string,
     *  dom?: HTMLElement,
     *  textHighlights?: string,
     *  textLightHighlights?: string
     * }} PostRecord
     */

    function createHistoryFetcher(shortDID) {
      let fetchMorePromise;

      const postsSeen = {};

      let cursor = undefined;
      let endReached = false;
      let lastResponseTime;
      const fetcher = {
        fetchMore,
        posts: /** @type {PostRecord[]} */([]),
        endReached: false
      };
      return fetcher;

      /** @returns {Promise<boolean | void>} */
      function fetchMore() {
        if (!fetchMorePromise) {
          fetchMorePromise = fetchMoreCore();
        }

        return fetchMorePromise
      }

      async function fetchMoreCore() {
        if (endReached && lastResponseTime && Date.now() - lastResponseTime < 1000) {
          return false;
        }

        fetcher.endReached = endReached = false;

        const posts = await atClient.com.atproto.repo.listRecords({
          collection: 'app.bsky.feed.post',
          repo: unwrapShortDID(shortDID),
          cursor
        });

        if (posts.data.cursor)
          cursor = posts.data.cursor;

        fetcher.endReached = endReached = !posts.data.cursor;


        for (const p of posts.data.records) {
          if (p.uri in postsSeen) continue;
          postsSeen[p.uri] = true;

          const combinePostAndRecord = {
            ...p,
            ...p.value
          };

          fetcher.posts.push(/** @type {*} */(combinePostAndRecord));
        }

        lastResponseTime = Date.now();

        fetchMorePromise = undefined;
      }
    }

    function displaySearchPage(preloadSearchText) {
      dom.searchINPUT.oninput = handleSearchType;
      dom.searchINPUT.onkeydown = handleAccountSearchInputKeydown;
      dom.searchINPUT.onkeyup = handleSearchType;
      dom.searchINPUT.onchange = handleSearchType;

      dom.banner.style.backgroundImage = '';
      dom.closeLink.style.display = 'none';
      dom.titleH2.textContent = overrideLang === 'ua' ?
        ' Пошук в історії:' :
        ' History search:';
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
      const q = urlParams.get('q');
      dom.closeLink.style.display = 'block';
      dom.closeLink.onclick = () => {
        history.pushState({}, '', 'index.html');
        dom.resultsPane.textContent = 'Pick an account to search history.';
        displaySearchPage();
      };

      if (did || handle) {
        displaySearchResultsFor(did, handle, undefined, q);
      } else {
        displaySearchPage();
      }
    }


    const waitForLibrariesLoaded = new Promise((resolve) => {
      // @ts-ignore
      receipts = () => {
        const oldXrpc = 'https://bsky.social/xrpc';
        // const newXrpc = 'https://bsky.network/xrpc';

        atClient = new atproto_api.BskyAgent({ service: 'https://bsky.social/xrpc' });
        resolve(undefined);
      }
    });

    /** @type {*} */(window).module = { exports: {}  };

    const dom = initSearchPageDOM();

    detectModeAndShow();

  }


  async function runInLocalNodeScript() {
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
      /** @type {{ [shortDID: string]: string | [handle: string, displayName: string] }} */
      const allUsers = {};
      /** @type {{ [first2Letters: string] : typeof allUsers }} */
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
          /** @type {typeof allUsers} */
          const bucket = evalJsonp(fs.readFileSync(file, 'utf8'));
          Object.assign(allUsers, bucket);
          const first2Letters = path.basename(file, '.js');
          byFirst2Letters[first2Letters.charAt(0) + '/' + first2Letters] = bucket;
        }
      }

      return { allUsers, byFirst2Letters };
    }

    async function makeSearchIndex() {
      console.log('Fetching Unicode data...');
      const localUnicodeDataPath = path.resolve(__dirname, '../receipts-db/UnicodeData.txt');
      const unicodeDataTxt =fs.existsSync(localUnicodeDataPath) ? fs.readFileSync(localUnicodeDataPath, 'utf8') :
        await new Promise((resolve, reject) => require('https').get(
        'https://unicode.org/Public/UNIDATA/UnicodeData.txt',
        (res) => {
          res.on('error', (err) => reject(err));
          let data = [];
          res.on('data', (chunk) => data.push(chunk));
          res.on('end', () => resolve(Buffer.concat(data).toString('utf8')));
          }));
      if (!fs.existsSync(localUnicodeDataPath))
        fs.writeFileSync(localUnicodeDataPath, unicodeDataTxt);

      console.log('Processing unicode data...');

      /** @type {[code: string, name: string, category: string]} */
      const unicodeData = unicodeDataTxt.split('\n').filter(line => !!line).map(line => line.split(';'));
      const characterCategories = {};
      const characterNames = {};
      const characterNameWords = {};
      const firstCharacterNameWordFrequencies = {};
      const midCharacterNameWordFrequencies = {};

      const emojiRegExp = /\p{Emoji_Presentation}|\p{Emoji}/ug;
      for (const [code, name, category] of unicodeData) {
        const char = String.fromCharCode(parseInt(code, 16));
        characterCategories[char] = category;
        characterNames[char] = name;

        if (category.charAt(0) === 'S') {
          const nameWords = name.split(' ');
          characterNameWords[char] = nameWords;

          if (emojiRegExp.test(char)) {
            continue;
          }

          let first = true;
          for (const word of nameWords) {
            if (word.length <= 1) continue;
            const freqs = first ? firstCharacterNameWordFrequencies : midCharacterNameWordFrequencies;
            freqs[word] = (freqs[word] || 0) + 1;
            first = false;
          }
        }
      }

      const firstCharacterNameWordsSorted = Object.keys(firstCharacterNameWordFrequencies).sort((a, b) =>
        firstCharacterNameWordFrequencies[b] - firstCharacterNameWordFrequencies[a]);
      const midCharacterNameWordsSorted = Object.keys(midCharacterNameWordFrequencies).sort((a, b) =>
        midCharacterNameWordFrequencies[b] - midCharacterNameWordFrequencies[a]);
      
      const genericFirstCharacterNames = firstCharacterNameWordsSorted.filter(word =>
        firstCharacterNameWordFrequencies[word] >= 15);
      const genericMidCharacterNames = firstCharacterNameWordsSorted.filter(word =>
        midCharacterNameWordFrequencies[word] >= 25);
      
      for (const char in characterNameWords) {
        if (emojiRegExp.test(char)) continue;

        const words = characterNameWords[char];
        if (!Array.isArray(words)) continue;

        let updateWords;
        let first = true;
        for (const w of words) {
          const checkIn = first ? genericFirstCharacterNames : genericMidCharacterNames;
          // if (checkIn.indexOf(w) >= 0) {
          //   if (!updateWords) updateWords = words.slice();
          //   updateWords[words.indexOf(w)] = w + char;
          // }
        }
      }

      console.log('Generic first character names: ',
        genericFirstCharacterNames.map(word => word + ':' + firstCharacterNameWordFrequencies[word]).join(', '));
      console.log();
      console.log('Generic mid character names: ',
        genericMidCharacterNames.map(word => word + ':' + midCharacterNameWordFrequencies[word]).join(', '));

      console.log('reading...');
      const { allUsers, byFirst2Letters } = loadFromReceitptsDb();

      /** @type {{ [key: string]: { [shortDID: string]: string | [handle: string, displayName: string] } }} */
      const index = {};

      const buf = [];
      for (const shortDID in allUsers) {
        let handle, displayName;
        const pair = allUsers[shortDID];
        if (typeof pair === 'string')
          handle = pair;
        else
          [handle, displayName] = pair;

        buf.length = 0;
        getIndexKeys(shortDID, handle, displayName, buf);
        for (const indexKey of buf) {
          const byShortDID = index[indexKey];
          if (byShortDID) byShortDID[shortDID] = pair;
          else index[indexKey] = { [shortDID]: pair };
        }
      }

      return;




      //const atClient = new atproto_api.BskyAgent({ service: 'https://bsky.social/xrpc' });

      const allDIDs = Object.keys(allUsers).sort();
      const firstDID = allDIDs[0];
      console.log('firstDID: ' + firstDID);

      let letterCount = 0;
      for (const twoLettersKey in byFirst2Letters) {
        if (/\d/.test(twoLettersKey)) continue;
        if (!/^t/.test(twoLettersKey)) continue;

        if (letterCount++ > 6) break;

        const twoActualLetters = twoLettersKey.split('/').slice(-1)[0];
        const searcher = new RegExp('\\b' + twoActualLetters, 'i');
        const match = Object.keys(allUsers).filter(shortDID => {
          let pair = allUsers[shortDID];
          let handle, displayName;
          if (typeof pair === 'string')
            handle = pair;
          else
            [handle, displayName] = pair;

          if (searcher.test(handle)) return true;
          else if (displayName && searcher.test(displayName)) return true;

          if (byFirst2Letters[twoLettersKey][shortDID]) {
            //console.log('  ' + shortDID + ' ' + handle + ' ' + displayName + ' DOES NOT MATCH ' + twoActualLetters);
          }
        });

        console.log(
          twoLettersKey + ': ' + match.length + ' matches, ' +
          Object.keys(byFirst2Letters[twoLettersKey]).length + ' bucket');
      }

      return;

      /**
       * @param {string} shortDID
       * @param {string} handle
       * @param {string | undefined} displayName
       * @param {string[]} indexKeys
       */
      function getIndexKeys(shortDID, handle, displayName, indexKeys) {
        indexKeys.push(shortDID.slice(0, 2));
        getWords(handle, indexKeys);
        if (displayName) getWords(displayName, indexKeys);
      }

      /**
       * @param {string} text
       * @param {string[]} indexKeys
       */
      function getWords(text, indexKeys) {
        const stripAccents = String(text || '').normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        const chars = [...stripAccents];
        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i];
          if (emojiRegExp.test(ch)) {
            addWord(ch, indexKeys);
            continue;
          }

          const category = characterCategories[ch].charAt(0);
          if (category === 'L') {
            // collect 2 letters, skip rest of the word
            // (normalize away accents)
          }

          if (category === 'N') {
            let numStrLength = 1;
            let numberStr = getNumber(ch);
            if (!numberStr) continue;
            if (numberStr.length < 2 && i + 1 < chars.length) {
              const nextCh = chars[i + 1];
              const nextCategory = characterCategories[nextCh].charAt(0);
              if (nextCategory !== 'N') break;
              const nextNumStr = getNumber(nextCh);
              if (!nextNumStr) numberStr += nextNumStr;
            }
            addWord(numberStr)
          }

          if (category === 'S') {
            addWord(ch, indexKeys);
            continue;
          }

        }
      }

      function getCategory(ch) {
        if (ch >= 'a' && ch <= 'z' || ch >= 'A' || ch <= 'Z') return 'L';
        else if (ch => '0' && ch <= '9') return 'N';
        else if (emojiRegExp.test(ch)) return 'E';

        const cat = characterCategories[ch];
        
      }
    
      /** @type {RegExp} */
      var numRegexp;
      function getNumber(ch) {
        if (ch >= '0' && ch <= '9') return ch;

        const name = characterNames[ch];
        let str = '';
        if (!numRegexp) numRegexp = initRegExpGetNumber();
        const match = numRegexp.exec(name);
        if (match)
          return String(50 - match.map(x => x ? 'a' : ' ').slice(1).join('').indexOf('a'));
      }

      function initRegExpGetNumber() {
        const oneToNine = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
        return new RegExp([
          'FIFTY',
          ...[].concat.apply([], ['FOURTY', 'THIRTY', 'TWENTY'].map(tens =>
            oneToNine.slice().reverse().map(dig => tens + ' ' + dig).concat([tens]))),
          'NINETEEN',
          'EIGHTEEN',
          'SEVENTEEN',
          'SIXTEEN',
          'FIFTEEN',
          'FOURTEEN',
          'THIRTEEN',
          'TWELVE',
          'ELEVEN',
          'TEN',
          ...oneToNine.slice().reverse(),
          'ZERO'
        ].map(num => '(' + num + ')').join('|'));
      }

      function addWord(ch, indexKey) {
        if (indexKey.indexOf(ch) < 0)
          indexKey.push(ch);
      }

    }

    async function exportToBlueSkyStatic() {
      console.log('Reading receipts-db...');
      const { allUsers, byFirst2Letters } = loadFromReceitptsDb();
      const dids = Object.keys(allUsers);
      console.log('  OK ' + dids.length + ' users.');

      console.log('Making dids export...');
      let didsLines = [];
      const chunkSize = 6;
      let totalLength = 2;
      for (let i = 0; i < dids.length; i += chunkSize) {
        const chunk = dids.slice(i, i + chunkSize);
        const line = chunk.map(shortDID => '"' + shortDID + '"').join(',');
        didsLines.push(line);
        totalLength += 2;
      }
      totalLength += 2;
      console.log(' OK ' +totalLength + ' characters.');

      console.log('Saving...');
      fs.writeFileSync(
        path.join(__dirname, '../bluesky-static/accounts/dids.json'),
        '[\n' + didsLines.join(',\n') + '\n]\n'
      );
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
          console.log(
            '  ' + (batchEndTime - batchStart) / 1000 + 's, ' +
            ((nextList.data?.repos?.length || 0) / (batchEndTime - batchStart) * 1000).toFixed(1) + ' per second ' +
            '(total ' + Object.keys(allUsers).length + ' users)\n\n');

          if (!nextList.data?.cursor) {
            console.log('received cursor ' + nextList.data?.cursor, ', ', nextList.data?.repos?.length, ' repos. EXIT.');
            break;
          }

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
        /** @type {string| [string,string]} */
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

    // console.log('Receipts updates: users...');
    // await updateUsers();
    // console.log('COMPLETE.');

    // makeSearchIndex();

    exportToBlueSkyStatic();
  }

  function runInAzure() {
  }

  function runAsModule() {
  }

  function getHandleBucket(shortHandle) {
    const first2Letters =
      /\d/.test(shortHandle.charAt(0)) ? '00' :
        shortHandle.replace(/[^a-z0-9]/gi, '').replace(/[1-9]+/gi, '0').slice(0, 2).toLowerCase();
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
   * @param {string | null | undefined} did
   * @param {string | null | undefined} cid
   */
  function getBlobUrl(did, cid) {
    // see also bannerCid && 'https://bsky.social/xrpc/com.atproto.sync.getBlob?did=' + unwrapShortDID(did) + '&cid=' + bannerCid;
    if (!did || !cid) return undefined;
    return `https://cdn.bsky.app/img/avatar/plain/${unwrapShortDID(did)}/${cid}@jpeg`;
  }

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

  /** @param {string} searchText */
  function textSearcher(searchText) {
    const mushMatch = new RegExp([...searchText.replace(/[^a-z0-9]/gi, '')].join('.*'), 'i');
    const mushMatchLead = new RegExp('^' + [...searchText.replace(/[^a-z0-9]/gi, '')].join('.*'), 'i');

    const lowercaseSearchText = searchText.trim().toLowerCase();
    const lettersOnlySearchText = lowercaseSearchText.replace(/[^a-z0-9]/gi, '');

    const searchWordRegExp = new RegExp(
      searchText.split(/\s+/)
        // sort longer words match first
        .sort((w1, w2) => w2.length - w1.length || (w1 > w2 ? 1 : w1 < w2 ? -1 : 0))
        // generate a regexp out of word
        .map(word => '(' + word.toLowerCase().replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + ')')
        .join('|'),
      'gi');

    return matchRank;

    /** @param {string} matchText */
    function matchRank(matchText) {
      let rank = 0;
      const trimmedMatchText = matchText.trim();
      const lowercaseTrimmedMatchText = trimmedMatchText.toLowerCase();
      if (!lowercaseTrimmedMatchText) return 0;

      if (trimmedMatchText === searchText) return 600;
      else if (lowercaseTrimmedMatchText === lowercaseSearchText) return 550;

      if (matchText.trim().toLowerCase().replace(/[^a-z0-9]/gi, '') === lettersOnlySearchText) return 400;
      {
        const posLowerc = lowercaseTrimmedMatchText.indexOf(lowercaseSearchText);
        if (!posLowerc) rank += 30;
        if (posLowerc > 0) rank += 20;
      }

      searchWordRegExp.lastIndex = 0;
      while (true) {
        const match = searchWordRegExp.exec(matchText);
        if (!match?.[0]) break;
        rank += (match[0].length / matchText.length);
        if (match.index === 0) rank += 3;
      }

      if (mushMatch.test(matchText)) rank += 0.03;
      if (mushMatchLead.test(matchText)) rank += 0.05;

      return rank;
    }
  }

  /**
 * @param {any} x
 * @returns {x is Promise<any>}
 */
  function isPromise(x) {
    if (!x || typeof x !== 'object') return false;
    else return typeof x.then === 'function';
  }

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
