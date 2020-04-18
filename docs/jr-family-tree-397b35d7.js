/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function t(t, e, n, i) {
  var s,
    r = arguments.length,
    o = r < 3 ? e : null === i ? (i = Object.getOwnPropertyDescriptor(e, n)) : i;
  if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
    o = Reflect.decorate(t, e, n, i);
  else
    for (var a = t.length - 1; a >= 0; a--)
      (s = t[a]) && (o = (r < 3 ? s(o) : r > 3 ? s(e, n, o) : s(e, n)) || o);
  return r > 3 && o && Object.defineProperty(e, n, o), o;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
}
const e =
    'undefined' != typeof window &&
    null != window.customElements &&
    void 0 !== window.customElements.polyfillWrapFlushCallback,
  n = (t, e, n = null) => {
    for (; e !== n; ) {
      const n = e.nextSibling;
      t.removeChild(e), (e = n);
    }
  },
  i = `{{lit-${String(Math.random()).slice(2)}}}`,
  s = `\x3c!--${i}--\x3e`,
  r = new RegExp(`${i}|${s}`);
class o {
  constructor(t, e) {
    (this.parts = []), (this.element = e);
    const n = [],
      s = [],
      o = document.createTreeWalker(e.content, 133, null, !1);
    let h = 0,
      p = -1,
      d = 0;
    const {
      strings: u,
      values: { length: f },
    } = t;
    for (; d < f; ) {
      const t = o.nextNode();
      if (null !== t) {
        if ((p++, 1 === t.nodeType)) {
          if (t.hasAttributes()) {
            const e = t.attributes,
              { length: n } = e;
            let i = 0;
            for (let t = 0; t < n; t++) a(e[t].name, '$lit$') && i++;
            for (; i-- > 0; ) {
              const e = u[d],
                n = l.exec(e)[2],
                i = n.toLowerCase() + '$lit$',
                s = t.getAttribute(i);
              t.removeAttribute(i);
              const o = s.split(r);
              this.parts.push({ type: 'attribute', index: p, name: n, strings: o }),
                (d += o.length - 1);
            }
          }
          'TEMPLATE' === t.tagName && (s.push(t), (o.currentNode = t.content));
        } else if (3 === t.nodeType) {
          const e = t.data;
          if (e.indexOf(i) >= 0) {
            const i = t.parentNode,
              s = e.split(r),
              o = s.length - 1;
            for (let e = 0; e < o; e++) {
              let n,
                r = s[e];
              if ('' === r) n = c();
              else {
                const t = l.exec(r);
                null !== t &&
                  a(t[2], '$lit$') &&
                  (r = r.slice(0, t.index) + t[1] + t[2].slice(0, -'$lit$'.length) + t[3]),
                  (n = document.createTextNode(r));
              }
              i.insertBefore(n, t), this.parts.push({ type: 'node', index: ++p });
            }
            '' === s[o] ? (i.insertBefore(c(), t), n.push(t)) : (t.data = s[o]), (d += o);
          }
        } else if (8 === t.nodeType)
          if (t.data === i) {
            const e = t.parentNode;
            (null !== t.previousSibling && p !== h) || (p++, e.insertBefore(c(), t)),
              (h = p),
              this.parts.push({ type: 'node', index: p }),
              null === t.nextSibling ? (t.data = '') : (n.push(t), p--),
              d++;
          } else {
            let e = -1;
            for (; -1 !== (e = t.data.indexOf(i, e + 1)); )
              this.parts.push({ type: 'node', index: -1 }), d++;
          }
      } else o.currentNode = s.pop();
    }
    for (const t of n) t.parentNode.removeChild(t);
  }
}
const a = (t, e) => {
    const n = t.length - e.length;
    return n >= 0 && t.slice(n) === e;
  },
  h = t => -1 !== t.index,
  c = () => document.createComment(''),
  l = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
function p(t, e) {
  const {
      element: { content: n },
      parts: i,
    } = t,
    s = document.createTreeWalker(n, 133, null, !1);
  let r = u(i),
    o = i[r],
    a = -1,
    h = 0;
  const c = [];
  let l = null;
  for (; s.nextNode(); ) {
    a++;
    const t = s.currentNode;
    for (
      t.previousSibling === l && (l = null),
        e.has(t) && (c.push(t), null === l && (l = t)),
        null !== l && h++;
      void 0 !== o && o.index === a;

    )
      (o.index = null !== l ? -1 : o.index - h), (r = u(i, r)), (o = i[r]);
  }
  c.forEach(t => t.parentNode.removeChild(t));
}
const d = t => {
    let e = 11 === t.nodeType ? 0 : 1;
    const n = document.createTreeWalker(t, 133, null, !1);
    for (; n.nextNode(); ) e++;
    return e;
  },
  u = (t, e = -1) => {
    for (let n = e + 1; n < t.length; n++) {
      const e = t[n];
      if (h(e)) return n;
    }
    return -1;
  };
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const f = new WeakMap(),
  m = t => 'function' == typeof t && f.has(t),
  g = {},
  v = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y {
  constructor(t, e, n) {
    (this.__parts = []), (this.template = t), (this.processor = e), (this.options = n);
  }
  update(t) {
    let e = 0;
    for (const n of this.__parts) void 0 !== n && n.setValue(t[e]), e++;
    for (const t of this.__parts) void 0 !== t && t.commit();
  }
  _clone() {
    const t = e
        ? this.template.element.content.cloneNode(!0)
        : document.importNode(this.template.element.content, !0),
      n = [],
      i = this.template.parts,
      s = document.createTreeWalker(t, 133, null, !1);
    let r,
      o = 0,
      a = 0,
      c = s.nextNode();
    for (; o < i.length; )
      if (((r = i[o]), h(r))) {
        for (; a < r.index; )
          a++,
            'TEMPLATE' === c.nodeName && (n.push(c), (s.currentNode = c.content)),
            null === (c = s.nextNode()) && ((s.currentNode = n.pop()), (c = s.nextNode()));
        if ('node' === r.type) {
          const t = this.processor.handleTextExpression(this.options);
          t.insertAfterNode(c.previousSibling), this.__parts.push(t);
        } else
          this.__parts.push(
            ...this.processor.handleAttributeExpressions(c, r.name, r.strings, this.options),
          );
        o++;
      } else this.__parts.push(void 0), o++;
    return e && (document.adoptNode(t), customElements.upgrade(t)), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ const _ = ` ${i} `;
class w {
  constructor(t, e, n, i) {
    (this.strings = t), (this.values = e), (this.type = n), (this.processor = i);
  }
  getHTML() {
    const t = this.strings.length - 1;
    let e = '',
      n = !1;
    for (let r = 0; r < t; r++) {
      const t = this.strings[r],
        o = t.lastIndexOf('\x3c!--');
      n = (o > -1 || n) && -1 === t.indexOf('--\x3e', o + 1);
      const a = l.exec(t);
      e += null === a ? t + (n ? _ : s) : t.substr(0, a.index) + a[1] + a[2] + '$lit$' + a[3] + i;
    }
    return (e += this.strings[t]), e;
  }
  getTemplateElement() {
    const t = document.createElement('template');
    return (t.innerHTML = this.getHTML()), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ const b = t => null === t || !('object' == typeof t || 'function' == typeof t),
  S = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
class x {
  constructor(t, e, n) {
    (this.dirty = !0), (this.element = t), (this.name = e), (this.strings = n), (this.parts = []);
    for (let t = 0; t < n.length - 1; t++) this.parts[t] = this._createPart();
  }
  _createPart() {
    return new P(this);
  }
  _getValue() {
    const t = this.strings,
      e = t.length - 1;
    let n = '';
    for (let i = 0; i < e; i++) {
      n += t[i];
      const e = this.parts[i];
      if (void 0 !== e) {
        const t = e.value;
        if (b(t) || !S(t)) n += 'string' == typeof t ? t : String(t);
        else for (const e of t) n += 'string' == typeof e ? e : String(e);
      }
    }
    return (n += t[e]), n;
  }
  commit() {
    this.dirty && ((this.dirty = !1), this.element.setAttribute(this.name, this._getValue()));
  }
}
class P {
  constructor(t) {
    (this.value = void 0), (this.committer = t);
  }
  setValue(t) {
    t === g ||
      (b(t) && t === this.value) ||
      ((this.value = t), m(t) || (this.committer.dirty = !0));
  }
  commit() {
    for (; m(this.value); ) {
      const t = this.value;
      (this.value = g), t(this);
    }
    this.value !== g && this.committer.commit();
  }
}
class C {
  constructor(t) {
    (this.value = void 0), (this.__pendingValue = void 0), (this.options = t);
  }
  appendInto(t) {
    (this.startNode = t.appendChild(c())), (this.endNode = t.appendChild(c()));
  }
  insertAfterNode(t) {
    (this.startNode = t), (this.endNode = t.nextSibling);
  }
  appendIntoPart(t) {
    t.__insert((this.startNode = c())), t.__insert((this.endNode = c()));
  }
  insertAfterPart(t) {
    t.__insert((this.startNode = c())), (this.endNode = t.endNode), (t.endNode = this.startNode);
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    if (null === this.startNode.parentNode) return;
    for (; m(this.__pendingValue); ) {
      const t = this.__pendingValue;
      (this.__pendingValue = g), t(this);
    }
    const t = this.__pendingValue;
    t !== g &&
      (b(t)
        ? t !== this.value && this.__commitText(t)
        : t instanceof w
        ? this.__commitTemplateResult(t)
        : t instanceof Node
        ? this.__commitNode(t)
        : S(t)
        ? this.__commitIterable(t)
        : t === v
        ? ((this.value = v), this.clear())
        : this.__commitText(t));
  }
  __insert(t) {
    this.endNode.parentNode.insertBefore(t, this.endNode);
  }
  __commitNode(t) {
    this.value !== t && (this.clear(), this.__insert(t), (this.value = t));
  }
  __commitText(t) {
    const e = this.startNode.nextSibling,
      n = 'string' == typeof (t = null == t ? '' : t) ? t : String(t);
    e === this.endNode.previousSibling && 3 === e.nodeType
      ? (e.data = n)
      : this.__commitNode(document.createTextNode(n)),
      (this.value = t);
  }
  __commitTemplateResult(t) {
    const e = this.options.templateFactory(t);
    if (this.value instanceof y && this.value.template === e) this.value.update(t.values);
    else {
      const n = new y(e, t.processor, this.options),
        i = n._clone();
      n.update(t.values), this.__commitNode(i), (this.value = n);
    }
  }
  __commitIterable(t) {
    Array.isArray(this.value) || ((this.value = []), this.clear());
    const e = this.value;
    let n,
      i = 0;
    for (const s of t)
      (n = e[i]),
        void 0 === n &&
          ((n = new C(this.options)),
          e.push(n),
          0 === i ? n.appendIntoPart(this) : n.insertAfterPart(e[i - 1])),
        n.setValue(s),
        n.commit(),
        i++;
    i < e.length && ((e.length = i), this.clear(n && n.endNode));
  }
  clear(t = this.startNode) {
    n(this.startNode.parentNode, t.nextSibling, this.endNode);
  }
}
class E {
  constructor(t, e, n) {
    if (
      ((this.value = void 0),
      (this.__pendingValue = void 0),
      2 !== n.length || '' !== n[0] || '' !== n[1])
    )
      throw new Error('Boolean attributes can only contain a single expression');
    (this.element = t), (this.name = e), (this.strings = n);
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    for (; m(this.__pendingValue); ) {
      const t = this.__pendingValue;
      (this.__pendingValue = g), t(this);
    }
    if (this.__pendingValue === g) return;
    const t = !!this.__pendingValue;
    this.value !== t &&
      (t ? this.element.setAttribute(this.name, '') : this.element.removeAttribute(this.name),
      (this.value = t)),
      (this.__pendingValue = g);
  }
}
class N extends x {
  constructor(t, e, n) {
    super(t, e, n), (this.single = 2 === n.length && '' === n[0] && '' === n[1]);
  }
  _createPart() {
    return new T(this);
  }
  _getValue() {
    return this.single ? this.parts[0].value : super._getValue();
  }
  commit() {
    this.dirty && ((this.dirty = !1), (this.element[this.name] = this._getValue()));
  }
}
class T extends P {}
let A = !1;
(() => {
  try {
    const t = {
      get capture() {
        return (A = !0), !1;
      },
    };
    window.addEventListener('test', t, t), window.removeEventListener('test', t, t);
  } catch (t) {}
})();
class k {
  constructor(t, e, n) {
    (this.value = void 0),
      (this.__pendingValue = void 0),
      (this.element = t),
      (this.eventName = e),
      (this.eventContext = n),
      (this.__boundHandleEvent = t => this.handleEvent(t));
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    for (; m(this.__pendingValue); ) {
      const t = this.__pendingValue;
      (this.__pendingValue = g), t(this);
    }
    if (this.__pendingValue === g) return;
    const t = this.__pendingValue,
      e = this.value,
      n =
        null == t ||
        (null != e && (t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive)),
      i = null != t && (null == e || n);
    n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options),
      i &&
        ((this.__options = $(t)),
        this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)),
      (this.value = t),
      (this.__pendingValue = g);
  }
  handleEvent(t) {
    'function' == typeof this.value
      ? this.value.call(this.eventContext || this.element, t)
      : this.value.handleEvent(t);
  }
}
const $ = t => t && (A ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ function U(t) {
  let e = O.get(t.type);
  void 0 === e && ((e = { stringsArray: new WeakMap(), keyString: new Map() }), O.set(t.type, e));
  let n = e.stringsArray.get(t.strings);
  if (void 0 !== n) return n;
  const s = t.strings.join(i);
  return (
    (n = e.keyString.get(s)),
    void 0 === n && ((n = new o(t, t.getTemplateElement())), e.keyString.set(s, n)),
    e.stringsArray.set(t.strings, n),
    n
  );
}
const O = new Map(),
  R = new WeakMap();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ const j = new /**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(class {
  handleAttributeExpressions(t, e, n, i) {
    const s = e[0];
    if ('.' === s) {
      return new N(t, e.slice(1), n).parts;
    }
    return '@' === s
      ? [new k(t, e.slice(1), i.eventContext)]
      : '?' === s
      ? [new E(t, e.slice(1), n)]
      : new x(t, e, n).parts;
  }
  handleTextExpression(t) {
    return new C(t);
  }
})();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ 'undefined' != typeof window &&
  (window.litHtmlVersions || (window.litHtmlVersions = [])).push('1.2.1');
const V = (t, ...e) => new w(t, e, 'html', j),
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */ I = (t, e) => `${t}--${e}`;
let L = !0;
void 0 === window.ShadyCSS
  ? (L = !1)
  : void 0 === window.ShadyCSS.prepareTemplateDom &&
    (console.warn(
      'Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.',
    ),
    (L = !1));
const z = t => e => {
    const n = I(e.type, t);
    let s = O.get(n);
    void 0 === s && ((s = { stringsArray: new WeakMap(), keyString: new Map() }), O.set(n, s));
    let r = s.stringsArray.get(e.strings);
    if (void 0 !== r) return r;
    const a = e.strings.join(i);
    if (((r = s.keyString.get(a)), void 0 === r)) {
      const n = e.getTemplateElement();
      L && window.ShadyCSS.prepareTemplateDom(n, t), (r = new o(e, n)), s.keyString.set(a, r);
    }
    return s.stringsArray.set(e.strings, r), r;
  },
  M = ['html', 'svg'],
  q = new Set(),
  B = (t, e, n) => {
    q.add(t);
    const i = n ? n.element : document.createElement('template'),
      s = e.querySelectorAll('style'),
      { length: r } = s;
    if (0 === r) return void window.ShadyCSS.prepareTemplateStyles(i, t);
    const o = document.createElement('style');
    for (let t = 0; t < r; t++) {
      const e = s[t];
      e.parentNode.removeChild(e), (o.textContent += e.textContent);
    }
    (t => {
      M.forEach(e => {
        const n = O.get(I(e, t));
        void 0 !== n &&
          n.keyString.forEach(t => {
            const {
                element: { content: e },
              } = t,
              n = new Set();
            Array.from(e.querySelectorAll('style')).forEach(t => {
              n.add(t);
            }),
              p(t, n);
          });
      });
    })(t);
    const a = i.content;
    n
      ? (function(t, e, n = null) {
          const {
            element: { content: i },
            parts: s,
          } = t;
          if (null == n) return void i.appendChild(e);
          const r = document.createTreeWalker(i, 133, null, !1);
          let o = u(s),
            a = 0,
            h = -1;
          for (; r.nextNode(); ) {
            for (
              h++, r.currentNode === n && ((a = d(e)), n.parentNode.insertBefore(e, n));
              -1 !== o && s[o].index === h;

            ) {
              if (a > 0) {
                for (; -1 !== o; ) (s[o].index += a), (o = u(s, o));
                return;
              }
              o = u(s, o);
            }
          }
        })(n, o, a.firstChild)
      : a.insertBefore(o, a.firstChild),
      window.ShadyCSS.prepareTemplateStyles(i, t);
    const h = a.querySelector('style');
    if (window.ShadyCSS.nativeShadow && null !== h) e.insertBefore(h.cloneNode(!0), e.firstChild);
    else if (n) {
      a.insertBefore(o, a.firstChild);
      const t = new Set();
      t.add(o), p(n, t);
    }
  };
window.JSCompiler_renameProperty = (t, e) => t;
const H = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          return t ? '' : null;
        case Object:
        case Array:
          return null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      switch (e) {
        case Boolean:
          return null !== t;
        case Number:
          return null === t ? null : Number(t);
        case Object:
        case Array:
          return JSON.parse(t);
      }
      return t;
    },
  },
  W = (t, e) => e !== t && (e == e || t == t),
  F = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: W };
class D extends HTMLElement {
  constructor() {
    super(),
      (this._updateState = 0),
      (this._instanceProperties = void 0),
      (this._updatePromise = new Promise(t => (this._enableUpdatingResolver = t))),
      (this._changedProperties = new Map()),
      (this._reflectingProperties = void 0),
      this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this._classProperties.forEach((e, n) => {
        const i = this._attributeNameForProperty(n, e);
        void 0 !== i && (this._attributeToPropertyMap.set(i, n), t.push(i));
      }),
      t
    );
  }
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map();
      const t = Object.getPrototypeOf(this)._classProperties;
      void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
    }
  }
  static createProperty(t, e = F) {
    if (
      (this._ensureClassProperties(),
      this._classProperties.set(t, e),
      e.noAccessor || this.prototype.hasOwnProperty(t))
    )
      return;
    const n = 'symbol' == typeof t ? Symbol() : `__${t}`,
      i = this.getPropertyDescriptor(t, n, e);
    void 0 !== i && Object.defineProperty(this.prototype, t, i);
  }
  static getPropertyDescriptor(t, e, n) {
    return {
      get() {
        return this[e];
      },
      set(n) {
        const i = this[t];
        (this[e] = n), this._requestUpdate(t, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return (this._classProperties && this._classProperties.get(t)) || F;
  }
  static finalize() {
    const t = Object.getPrototypeOf(this);
    if (
      (t.hasOwnProperty('finalized') || t.finalize(),
      (this.finalized = !0),
      this._ensureClassProperties(),
      (this._attributeToPropertyMap = new Map()),
      this.hasOwnProperty(JSCompiler_renameProperty('properties', this)))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...('function' == typeof Object.getOwnPropertySymbols
            ? Object.getOwnPropertySymbols(t)
            : []),
        ];
      for (const n of e) this.createProperty(n, t[n]);
    }
  }
  static _attributeNameForProperty(t, e) {
    const n = e.attribute;
    return !1 === n
      ? void 0
      : 'string' == typeof n
      ? n
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  static _valueHasChanged(t, e, n = W) {
    return n(t, e);
  }
  static _propertyValueFromAttribute(t, e) {
    const n = e.type,
      i = e.converter || H,
      s = 'function' == typeof i ? i : i.fromAttribute;
    return s ? s(t, n) : t;
  }
  static _propertyValueToAttribute(t, e) {
    if (void 0 === e.reflect) return;
    const n = e.type,
      i = e.converter;
    return ((i && i.toAttribute) || H.toAttribute)(t, n);
  }
  initialize() {
    this._saveInstanceProperties(), this._requestUpdate();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((t, e) => {
      if (this.hasOwnProperty(e)) {
        const t = this[e];
        delete this[e],
          this._instanceProperties || (this._instanceProperties = new Map()),
          this._instanceProperties.set(e, t);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((t, e) => (this[e] = t)), (this._instanceProperties = void 0);
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    void 0 !== this._enableUpdatingResolver &&
      (this._enableUpdatingResolver(), (this._enableUpdatingResolver = void 0));
  }
  disconnectedCallback() {}
  attributeChangedCallback(t, e, n) {
    e !== n && this._attributeToProperty(t, n);
  }
  _propertyToAttribute(t, e, n = F) {
    const i = this.constructor,
      s = i._attributeNameForProperty(t, n);
    if (void 0 !== s) {
      const t = i._propertyValueToAttribute(e, n);
      if (void 0 === t) return;
      (this._updateState = 8 | this._updateState),
        null == t ? this.removeAttribute(s) : this.setAttribute(s, t),
        (this._updateState = -9 & this._updateState);
    }
  }
  _attributeToProperty(t, e) {
    if (8 & this._updateState) return;
    const n = this.constructor,
      i = n._attributeToPropertyMap.get(t);
    if (void 0 !== i) {
      const t = n.getPropertyOptions(i);
      (this._updateState = 16 | this._updateState),
        (this[i] = n._propertyValueFromAttribute(e, t)),
        (this._updateState = -17 & this._updateState);
    }
  }
  _requestUpdate(t, e) {
    let n = !0;
    if (void 0 !== t) {
      const i = this.constructor,
        s = i.getPropertyOptions(t);
      i._valueHasChanged(this[t], e, s.hasChanged)
        ? (this._changedProperties.has(t) || this._changedProperties.set(t, e),
          !0 !== s.reflect ||
            16 & this._updateState ||
            (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()),
            this._reflectingProperties.set(t, s)))
        : (n = !1);
    }
    !this._hasRequestedUpdate && n && (this._updatePromise = this._enqueueUpdate());
  }
  requestUpdate(t, e) {
    return this._requestUpdate(t, e), this.updateComplete;
  }
  async _enqueueUpdate() {
    this._updateState = 4 | this._updateState;
    try {
      await this._updatePromise;
    } catch (t) {}
    const t = this.performUpdate();
    return null != t && (await t), !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return 4 & this._updateState;
  }
  get hasUpdated() {
    return 1 & this._updateState;
  }
  performUpdate() {
    this._instanceProperties && this._applyInstanceProperties();
    let t = !1;
    const e = this._changedProperties;
    try {
      (t = this.shouldUpdate(e)), t ? this.update(e) : this._markUpdated();
    } catch (e) {
      throw ((t = !1), this._markUpdated(), e);
    }
    t &&
      (1 & this._updateState || ((this._updateState = 1 | this._updateState), this.firstUpdated(e)),
      this.updated(e));
  }
  _markUpdated() {
    (this._changedProperties = new Map()), (this._updateState = -5 & this._updateState);
  }
  get updateComplete() {
    return this._getUpdateComplete();
  }
  _getUpdateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._reflectingProperties &&
      this._reflectingProperties.size > 0 &&
      (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)),
      (this._reflectingProperties = void 0)),
      this._markUpdated();
  }
  updated(t) {}
  firstUpdated(t) {}
}
D.finalized = !0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const J = (t, e) =>
  'method' === e.kind && e.descriptor && !('value' in e.descriptor)
    ? Object.assign(Object.assign({}, e), {
        finisher(n) {
          n.createProperty(e.key, t);
        },
      })
    : {
        kind: 'field',
        key: Symbol(),
        placement: 'own',
        descriptor: {},
        initializer() {
          'function' == typeof e.initializer && (this[e.key] = e.initializer.call(this));
        },
        finisher(n) {
          n.createProperty(e.key, t);
        },
      };
function K(t) {
  return (e, n) =>
    void 0 !== n
      ? ((t, e, n) => {
          e.constructor.createProperty(n, t);
        })(t, e, n)
      : J(t, e);
}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const G =
    'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype,
  Z = Symbol();
class Q {
  constructor(t, e) {
    if (e !== Z)
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    this.cssText = t;
  }
  get styleSheet() {
    return (
      void 0 === this._styleSheet &&
        (G
          ? ((this._styleSheet = new CSSStyleSheet()), this._styleSheet.replaceSync(this.cssText))
          : (this._styleSheet = null)),
      this._styleSheet
    );
  }
  toString() {
    return this.cssText;
  }
}
const X = (t, ...e) => {
  const n = e.reduce(
    (e, n, i) =>
      e +
      (t => {
        if (t instanceof Q) return t.cssText;
        if ('number' == typeof t) return t;
        throw new Error(
          `Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`,
        );
      })(n) +
      t[i + 1],
    t[0],
  );
  return new Q(n, Z);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions || (window.litElementVersions = [])).push('2.3.1');
const Y = {};
class tt extends D {
  static getStyles() {
    return this.styles;
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) return;
    const t = this.getStyles();
    if (void 0 === t) this._styles = [];
    else if (Array.isArray(t)) {
      const e = (t, n) => t.reduceRight((t, n) => (Array.isArray(n) ? e(n, t) : (t.add(n), t)), n),
        n = e(t, new Set()),
        i = [];
      n.forEach(t => i.unshift(t)), (this._styles = i);
    } else this._styles = [t];
  }
  initialize() {
    super.initialize(),
      this.constructor._getUniqueStyles(),
      (this.renderRoot = this.createRenderRoot()),
      window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
  }
  createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }
  adoptStyles() {
    const t = this.constructor._styles;
    0 !== t.length &&
      (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
        ? G
          ? (this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet))
          : (this._needsShimAdoptedStyleSheets = !0)
        : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
            t.map(t => t.cssText),
            this.localName,
          ));
  }
  connectedCallback() {
    super.connectedCallback(),
      this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
  }
  update(t) {
    const e = this.render();
    super.update(t),
      e !== Y &&
        this.constructor.render(e, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this,
        }),
      this._needsShimAdoptedStyleSheets &&
        ((this._needsShimAdoptedStyleSheets = !1),
        this.constructor._styles.forEach(t => {
          const e = document.createElement('style');
          (e.textContent = t.cssText), this.renderRoot.appendChild(e);
        }));
  }
  render() {
    return Y;
  }
}
(tt.finalized = !0),
  (tt.render = (t, e, i) => {
    if (!i || 'object' != typeof i || !i.scopeName)
      throw new Error('The `scopeName` option is required.');
    const s = i.scopeName,
      r = R.has(e),
      o = L && 11 === e.nodeType && !!e.host,
      a = o && !q.has(s),
      h = a ? document.createDocumentFragment() : e;
    if (
      (((t, e, i) => {
        let s = R.get(e);
        void 0 === s &&
          (n(e, e.firstChild),
          R.set(e, (s = new C(Object.assign({ templateFactory: U }, i)))),
          s.appendInto(e)),
          s.setValue(t),
          s.commit();
      })(t, h, Object.assign({ templateFactory: z(s) }, i)),
      a)
    ) {
      const t = R.get(h);
      R.delete(h);
      const i = t.value instanceof y ? t.value.template : void 0;
      B(s, h, i), n(e, e.firstChild), e.appendChild(h), R.set(e, t);
    }
    !r && o && window.ShadyCSS.styleElement(e.host);
  });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const et = new WeakMap(),
  nt =
    ((it = t => e => {
      if (
        !(e instanceof P) ||
        e instanceof T ||
        'style' !== e.committer.name ||
        e.committer.parts.length > 1
      )
        throw new Error(
          'The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.',
        );
      const { committer: n } = e,
        { style: i } = n.element;
      let s = et.get(e);
      void 0 === s && ((i.cssText = n.strings.join(' ')), et.set(e, (s = new Set()))),
        s.forEach(e => {
          e in t || (s.delete(e), -1 === e.indexOf('-') ? (i[e] = null) : i.removeProperty(e));
        });
      for (const e in t) s.add(e), -1 === e.indexOf('-') ? (i[e] = t[e]) : i.setProperty(e, t[e]);
    }),
    (...t) => {
      const e = it(...t);
      return f.set(e, !0), e;
    });
var it,
  st =
    Array.isArray ||
    function(t) {
      return '[object Array]' == Object.prototype.toString.call(t);
    },
  rt = yt,
  ot = pt,
  at = function(t) {
    return dt(pt(t));
  },
  ht = dt,
  ct = vt,
  lt = new RegExp(
    [
      '(\\\\.)',
      '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))',
    ].join('|'),
    'g',
  );
function pt(t) {
  for (var e, n = [], i = 0, s = 0, r = ''; null != (e = lt.exec(t)); ) {
    var o = e[0],
      a = e[1],
      h = e.index;
    if (((r += t.slice(s, h)), (s = h + o.length), a)) r += a[1];
    else {
      r && (n.push(r), (r = ''));
      var c = e[2],
        l = e[3],
        p = e[4],
        d = e[5],
        u = e[6],
        f = e[7],
        m = '+' === u || '*' === u,
        g = '?' === u || '*' === u,
        v = c || '/',
        y = p || d || (f ? '.*' : '[^' + v + ']+?');
      n.push({
        name: l || i++,
        prefix: c || '',
        delimiter: v,
        optional: g,
        repeat: m,
        pattern: ft(y),
      });
    }
  }
  return s < t.length && (r += t.substr(s)), r && n.push(r), n;
}
function dt(t) {
  for (var e = new Array(t.length), n = 0; n < t.length; n++)
    'object' == typeof t[n] && (e[n] = new RegExp('^' + t[n].pattern + '$'));
  return function(n) {
    for (var i = '', s = n || {}, r = 0; r < t.length; r++) {
      var o = t[r];
      if ('string' != typeof o) {
        var a,
          h = s[o.name];
        if (null == h) {
          if (o.optional) continue;
          throw new TypeError('Expected "' + o.name + '" to be defined');
        }
        if (st(h)) {
          if (!o.repeat)
            throw new TypeError(
              'Expected "' + o.name + '" to not repeat, but received "' + h + '"',
            );
          if (0 === h.length) {
            if (o.optional) continue;
            throw new TypeError('Expected "' + o.name + '" to not be empty');
          }
          for (var c = 0; c < h.length; c++) {
            if (((a = encodeURIComponent(h[c])), !e[r].test(a)))
              throw new TypeError(
                'Expected all "' +
                  o.name +
                  '" to match "' +
                  o.pattern +
                  '", but received "' +
                  a +
                  '"',
              );
            i += (0 === c ? o.prefix : o.delimiter) + a;
          }
        } else {
          if (((a = encodeURIComponent(h)), !e[r].test(a)))
            throw new TypeError(
              'Expected "' + o.name + '" to match "' + o.pattern + '", but received "' + a + '"',
            );
          i += o.prefix + a;
        }
      } else i += o;
    }
    return i;
  };
}
function ut(t) {
  return t.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1');
}
function ft(t) {
  return t.replace(/([=!:$\/()])/g, '\\$1');
}
function mt(t, e) {
  return (t.keys = e), t;
}
function gt(t) {
  return t.sensitive ? '' : 'i';
}
function vt(t, e) {
  for (
    var n = (e = e || {}).strict,
      i = !1 !== e.end,
      s = '',
      r = t[t.length - 1],
      o = 'string' == typeof r && /\/$/.test(r),
      a = 0;
    a < t.length;
    a++
  ) {
    var h = t[a];
    if ('string' == typeof h) s += ut(h);
    else {
      var c = ut(h.prefix),
        l = h.pattern;
      h.repeat && (l += '(?:' + c + l + ')*'),
        (s += l = h.optional
          ? c
            ? '(?:' + c + '(' + l + '))?'
            : '(' + l + ')?'
          : c + '(' + l + ')');
    }
  }
  return (
    n || (s = (o ? s.slice(0, -2) : s) + '(?:\\/(?=$))?'),
    (s += i ? '$' : n && o ? '' : '(?=\\/|$)'),
    new RegExp('^' + s, gt(e))
  );
}
function yt(t, e, n) {
  return (
    st((e = e || [])) ? n || (n = {}) : ((n = e), (e = [])),
    t instanceof RegExp
      ? (function(t, e) {
          var n = t.source.match(/\((?!\?)/g);
          if (n)
            for (var i = 0; i < n.length; i++)
              e.push({
                name: i,
                prefix: null,
                delimiter: null,
                optional: !1,
                repeat: !1,
                pattern: null,
              });
          return mt(t, e);
        })(t, e)
      : st(t)
      ? (function(t, e, n) {
          for (var i = [], s = 0; s < t.length; s++) i.push(yt(t[s], e, n).source);
          return mt(new RegExp('(?:' + i.join('|') + ')', gt(n)), e);
        })(t, e, n)
      : (function(t, e, n) {
          for (var i = pt(t), s = vt(i, n), r = 0; r < i.length; r++)
            'string' != typeof i[r] && e.push(i[r]);
          return mt(s, e);
        })(t, e, n)
  );
}
(rt.parse = ot), (rt.compile = at), (rt.tokensToFunction = ht), (rt.tokensToRegExp = ct);
var _t,
  wt = 'undefined' != typeof document,
  bt = 'undefined' != typeof window,
  St = 'undefined' != typeof history,
  xt = 'undefined' != typeof process,
  Pt = wt && document.ontouchstart ? 'touchstart' : 'click',
  Ct = bt && !(!window.history.location && !window.location);
function Et() {
  (this.callbacks = []),
    (this.exits = []),
    (this.current = ''),
    (this.len = 0),
    (this._decodeURLComponents = !0),
    (this._base = ''),
    (this._strict = !1),
    (this._running = !1),
    (this._hashbang = !1),
    (this.clickHandler = this.clickHandler.bind(this)),
    (this._onpopstate = this._onpopstate.bind(this));
}
function Nt(t, e) {
  if ('function' == typeof t) return Nt.call(this, '*', t);
  if ('function' == typeof e)
    for (var n = new kt(t, null, this), i = 1; i < arguments.length; ++i)
      this.callbacks.push(n.middleware(arguments[i]));
  else
    'string' == typeof t ? this['string' == typeof e ? 'redirect' : 'show'](t, e) : this.start(t);
}
function Tt(t) {
  if (!t.handled) {
    var e = this._window;
    (this._hashbang
      ? Ct && this._getBase() + e.location.hash.replace('#!', '')
      : Ct && e.location.pathname + e.location.search) !== t.canonicalPath &&
      (this.stop(), (t.handled = !1), Ct && (e.location.href = t.canonicalPath));
  }
}
function At(t, e, n) {
  var i = (this.page = n || Nt),
    s = i._window,
    r = i._hashbang,
    o = i._getBase();
  '/' === t[0] && 0 !== t.indexOf(o) && (t = o + (r ? '#!' : '') + t);
  var a = t.indexOf('?');
  this.canonicalPath = t;
  var h = new RegExp('^' + o.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1'));
  if (
    ((this.path = t.replace(h, '') || '/'),
    r && (this.path = this.path.replace('#!', '') || '/'),
    (this.title = wt && s.document.title),
    (this.state = e || {}),
    (this.state.path = t),
    (this.querystring = ~a ? i._decodeURLEncodedURIComponent(t.slice(a + 1)) : ''),
    (this.pathname = i._decodeURLEncodedURIComponent(~a ? t.slice(0, a) : t)),
    (this.params = {}),
    (this.hash = ''),
    !r)
  ) {
    if (!~this.path.indexOf('#')) return;
    var c = this.path.split('#');
    (this.path = this.pathname = c[0]),
      (this.hash = i._decodeURLEncodedURIComponent(c[1]) || ''),
      (this.querystring = this.querystring.split('#')[0]);
  }
}
function kt(t, e, n) {
  this.page = n || $t;
  var i = e || {};
  (i.strict = i.strict || n._strict),
    (this.path = '*' === t ? '(.*)' : t),
    (this.method = 'GET'),
    (this.regexp = rt(this.path, (this.keys = []), i));
}
(Et.prototype.configure = function(t) {
  var e = t || {};
  (this._window = e.window || (bt && window)),
    (this._decodeURLComponents = !1 !== e.decodeURLComponents),
    (this._popstate = !1 !== e.popstate && bt),
    (this._click = !1 !== e.click && wt),
    (this._hashbang = !!e.hashbang);
  var n = this._window;
  this._popstate
    ? n.addEventListener('popstate', this._onpopstate, !1)
    : bt && n.removeEventListener('popstate', this._onpopstate, !1),
    this._click
      ? n.document.addEventListener(Pt, this.clickHandler, !1)
      : wt && n.document.removeEventListener(Pt, this.clickHandler, !1),
    this._hashbang && bt && !St
      ? n.addEventListener('hashchange', this._onpopstate, !1)
      : bt && n.removeEventListener('hashchange', this._onpopstate, !1);
}),
  (Et.prototype.base = function(t) {
    if (0 === arguments.length) return this._base;
    this._base = t;
  }),
  (Et.prototype._getBase = function() {
    var t = this._base;
    if (t) return t;
    var e = bt && this._window && this._window.location;
    return bt && this._hashbang && e && 'file:' === e.protocol && (t = e.pathname), t;
  }),
  (Et.prototype.strict = function(t) {
    if (0 === arguments.length) return this._strict;
    this._strict = t;
  }),
  (Et.prototype.start = function(t) {
    var e = t || {};
    if ((this.configure(e), !1 !== e.dispatch)) {
      var n;
      if (((this._running = !0), Ct)) {
        var i = this._window.location;
        n =
          this._hashbang && ~i.hash.indexOf('#!')
            ? i.hash.substr(2) + i.search
            : this._hashbang
            ? i.search + i.hash
            : i.pathname + i.search + i.hash;
      }
      this.replace(n, null, !0, e.dispatch);
    }
  }),
  (Et.prototype.stop = function() {
    if (this._running) {
      (this.current = ''), (this.len = 0), (this._running = !1);
      var t = this._window;
      this._click && t.document.removeEventListener(Pt, this.clickHandler, !1),
        bt && t.removeEventListener('popstate', this._onpopstate, !1),
        bt && t.removeEventListener('hashchange', this._onpopstate, !1);
    }
  }),
  (Et.prototype.show = function(t, e, n, i) {
    var s = new At(t, e, this),
      r = this.prevContext;
    return (
      (this.prevContext = s),
      (this.current = s.path),
      !1 !== n && this.dispatch(s, r),
      !1 !== s.handled && !1 !== i && s.pushState(),
      s
    );
  }),
  (Et.prototype.back = function(t, e) {
    var n = this;
    if (this.len > 0) {
      var i = this._window;
      St && i.history.back(), this.len--;
    } else
      t
        ? setTimeout(function() {
            n.show(t, e);
          })
        : setTimeout(function() {
            n.show(n._getBase(), e);
          });
  }),
  (Et.prototype.redirect = function(t, e) {
    var n = this;
    'string' == typeof t &&
      'string' == typeof e &&
      Nt.call(this, t, function(t) {
        setTimeout(function() {
          n.replace(e);
        }, 0);
      }),
      'string' == typeof t &&
        void 0 === e &&
        setTimeout(function() {
          n.replace(t);
        }, 0);
  }),
  (Et.prototype.replace = function(t, e, n, i) {
    var s = new At(t, e, this),
      r = this.prevContext;
    return (
      (this.prevContext = s),
      (this.current = s.path),
      (s.init = n),
      s.save(),
      !1 !== i && this.dispatch(s, r),
      s
    );
  }),
  (Et.prototype.dispatch = function(t, e) {
    var n = 0,
      i = 0,
      s = this;
    function r() {
      var e = s.callbacks[n++];
      if (t.path === s.current) return e ? void e(t, r) : Tt.call(s, t);
      t.handled = !1;
    }
    e
      ? (function t() {
          var n = s.exits[i++];
          if (!n) return r();
          n(e, t);
        })()
      : r();
  }),
  (Et.prototype.exit = function(t, e) {
    if ('function' == typeof t) return this.exit('*', t);
    for (var n = new kt(t, null, this), i = 1; i < arguments.length; ++i)
      this.exits.push(n.middleware(arguments[i]));
  }),
  (Et.prototype.clickHandler = function(t) {
    if (1 === this._which(t) && !(t.metaKey || t.ctrlKey || t.shiftKey || t.defaultPrevented)) {
      var e = t.target,
        n = t.path || (t.composedPath ? t.composedPath() : null);
      if (n)
        for (var i = 0; i < n.length; i++)
          if (n[i].nodeName && 'A' === n[i].nodeName.toUpperCase() && n[i].href) {
            e = n[i];
            break;
          }
      for (; e && 'A' !== e.nodeName.toUpperCase(); ) e = e.parentNode;
      if (e && 'A' === e.nodeName.toUpperCase()) {
        var s = 'object' == typeof e.href && 'SVGAnimatedString' === e.href.constructor.name;
        if (!e.hasAttribute('download') && 'external' !== e.getAttribute('rel')) {
          var r = e.getAttribute('href');
          if (
            (this._hashbang || !this._samePath(e) || (!e.hash && '#' !== r)) &&
            !(r && r.indexOf('mailto:') > -1) &&
            !(s ? e.target.baseVal : e.target) &&
            (s || this.sameOrigin(e.href))
          ) {
            var o = s ? e.href.baseVal : e.pathname + e.search + (e.hash || '');
            (o = '/' !== o[0] ? '/' + o : o),
              xt && o.match(/^\/[a-zA-Z]:\//) && (o = o.replace(/^\/[a-zA-Z]:\//, '/'));
            var a = o,
              h = this._getBase();
            0 === o.indexOf(h) && (o = o.substr(h.length)),
              this._hashbang && (o = o.replace('#!', '')),
              (!h || a !== o || (Ct && 'file:' === this._window.location.protocol)) &&
                (t.preventDefault(), this.show(a));
          }
        }
      }
    }
  }),
  (Et.prototype._onpopstate =
    ((_t = !1),
    bt
      ? (wt && 'complete' === document.readyState
          ? (_t = !0)
          : window.addEventListener('load', function() {
              setTimeout(function() {
                _t = !0;
              }, 0);
            }),
        function(t) {
          if (_t)
            if (t.state) {
              var e = t.state.path;
              this.replace(e, t.state);
            } else if (Ct) {
              var n = this._window.location;
              this.show(n.pathname + n.search + n.hash, void 0, void 0, !1);
            }
        })
      : function() {})),
  (Et.prototype._which = function(t) {
    return null == (t = t || (bt && this._window.event)).which ? t.button : t.which;
  }),
  (Et.prototype._toURL = function(t) {
    var e = this._window;
    if ('function' == typeof URL && Ct) return new URL(t, e.location.toString());
    if (wt) {
      var n = e.document.createElement('a');
      return (n.href = t), n;
    }
  }),
  (Et.prototype.sameOrigin = function(t) {
    if (!t || !Ct) return !1;
    var e = this._toURL(t),
      n = this._window.location;
    return n.protocol === e.protocol && n.hostname === e.hostname && n.port === e.port;
  }),
  (Et.prototype._samePath = function(t) {
    if (!Ct) return !1;
    var e = this._window.location;
    return t.pathname === e.pathname && t.search === e.search;
  }),
  (Et.prototype._decodeURLEncodedURIComponent = function(t) {
    return 'string' != typeof t
      ? t
      : this._decodeURLComponents
      ? decodeURIComponent(t.replace(/\+/g, ' '))
      : t;
  }),
  (At.prototype.pushState = function() {
    var t = this.page,
      e = t._window,
      n = t._hashbang;
    t.len++,
      St &&
        e.history.pushState(
          this.state,
          this.title,
          n && '/' !== this.path ? '#!' + this.path : this.canonicalPath,
        );
  }),
  (At.prototype.save = function() {
    var t = this.page;
    St &&
      t._window.history.replaceState(
        this.state,
        this.title,
        t._hashbang && '/' !== this.path ? '#!' + this.path : this.canonicalPath,
      );
  }),
  (kt.prototype.middleware = function(t) {
    var e = this;
    return function(n, i) {
      if (e.match(n.path, n.params)) return t(n, i);
      i();
    };
  }),
  (kt.prototype.match = function(t, e) {
    var n = this.keys,
      i = t.indexOf('?'),
      s = ~i ? t.slice(0, i) : t,
      r = this.regexp.exec(decodeURIComponent(s));
    if (!r) return !1;
    for (var o = 1, a = r.length; o < a; ++o) {
      var h = n[o - 1],
        c = this.page._decodeURLEncodedURIComponent(r[o]);
      (void 0 === c && hasOwnProperty.call(e, h.name)) || (e[h.name] = c);
    }
    return !0;
  });
var $t = (function t() {
    var e = new Et();
    function n() {
      return Nt.apply(e, arguments);
    }
    return (
      (n.callbacks = e.callbacks),
      (n.exits = e.exits),
      (n.base = e.base.bind(e)),
      (n.strict = e.strict.bind(e)),
      (n.start = e.start.bind(e)),
      (n.stop = e.stop.bind(e)),
      (n.show = e.show.bind(e)),
      (n.back = e.back.bind(e)),
      (n.redirect = e.redirect.bind(e)),
      (n.replace = e.replace.bind(e)),
      (n.dispatch = e.dispatch.bind(e)),
      (n.exit = e.exit.bind(e)),
      (n.configure = e.configure.bind(e)),
      (n.sameOrigin = e.sameOrigin.bind(e)),
      (n.clickHandler = e.clickHandler.bind(e)),
      (n.create = t),
      Object.defineProperty(n, 'len', {
        get: function() {
          return e.len;
        },
        set: function(t) {
          e.len = t;
        },
      }),
      Object.defineProperty(n, 'current', {
        get: function() {
          return e.current;
        },
        set: function(t) {
          e.current = t;
        },
      }),
      (n.Context = At),
      (n.Route = kt),
      n
    );
  })(),
  Ut = $t,
  Ot = $t;
Ut.default = Ot;
class Rt extends tt {
  constructor() {
    super(),
      (this.data = []),
      (this.mainId = -1),
      (this.themeWidth = 6),
      (this.themeColor = 'rgba(125,188,18,0.4'),
      fetch('/assets/data.json')
        .then(t => t.json())
        .then(t => {
          this.data = t;
        });
  }
  connectedCallback() {
    super.connectedCallback(),
      Ut.base('/family-tree'),
      Ut('/', this.noPerson.bind(this)),
      Ut('/:id', this.onNavigate.bind(this)),
      Ut();
  }
  onNavigate(t) {
    const e = t.params.id;
    (document.title = 'FT ' + e), (this.mainId = +e);
  }
  noPerson() {
    this.mainId = -1;
  }
  render() {
    return -1 === this.mainId
      ? V`<p>Kies een persoon</p>`
      : V` <jr-tree .mainId="${this.mainId}" .data="${this.data}" style="${nt({
          '--person-border-color': `${this.themeColor}`,
          '--person-border-width': `${this.themeWidth}px`,
          '--person-border-style': 'solid',
          '--connect-color': `${this.themeColor}`,
          '--connect-width': `${this.themeWidth}px`,
          '--connect-width-half': `${this.themeWidth / 2}px`,
          '--one-space': '16px',
          '--three-quarter-space': '12px',
        })}"></jr-tree> `;
  }
}
t([K({ type: Array })], Rt.prototype, 'data', void 0),
  t([K({ type: Number })], Rt.prototype, 'mainId', void 0),
  t([K({ type: Number })], Rt.prototype, 'themeWidth', void 0),
  t([K({ type: String })], Rt.prototype, 'themeColor', void 0);
class jt extends tt {
  constructor() {
    super(...arguments), (this.data = []), (this.mainId = -1);
  }
  static get styles() {
    return X`.tree-container{display:flex;flex:1;margin-top:var(--one-space);margin-bottom:var(--one-space)}.tree,.ancestors,.progeny{display:flex;flex-flow:column;align-items:center}.ancestors-container,.progeny-container{display:flex}.ancestors{justify-content:flex-end}.connect{background-color:var(--connect-color)}.vertical{width:var(--connect-width);height:var(--one-space)}.horizontal{height:var(--connect-width)}.ancestors .horizontal{width:50%}.horizontal.left{margin-right:var(--connect-width-half);margin-left:50%;padding-left:var(--connect-width-half)}.ancestors .horizontal.right{margin-right:50%;margin-left:var(--connect-width-half);padding-left:var(--connect-width-half)}.progeny .horizontal{width:100%}.progeny .horizontal.first{margin-right:var(--connect-width-half);margin-left:50%;padding-left:var(--connect-width-half);width:50%}.progeny .horizontal.last{margin-right:50%;margin-left:var(--connect-width-half);padding-right:var(--connect-width-half);width:50%}.progeny .horizontal.single{display:none}`;
  }
  static mainPersonTemplate(t, e) {
    const n = t.find(t => t.id === e);
    if (!n) return V`<p>Persoon bestaat niet</p>`;
    const i = t.find(t => t.fatherId === e || t.motherId === e),
      s = V`<div class="ancestor vertical connect"></div>`;
    return V` <div class="tree-container"> <div class="tree"> <div class="ancestors-container">${jt.ancestors(
      t,
      n,
    )}</div> ${
      n.fatherId || n.motherId ? s : V``
    } <jr-main-person .person="${n}"></jr-main-person> ${
      i ? V`<div class="progeny vertical connect"></div>` : V``
    } <div class="progeny-container">${jt.progenyTemplate(t, n, e, '')}</div> </div> </div> `;
  }
  static ancestors(t, e) {
    let n, i;
    if (e.fatherId) {
      const i = t.find(t => t.id === e.fatherId);
      n = jt.ancestorsTemplate(t, i, 'left');
    }
    if (e.motherId) {
      const n = t.find(t => t.id === e.motherId);
      i = jt.ancestorsTemplate(t, n, 'right');
    }
    return V`${n}${i}`;
  }
  static ancestorsTemplate(t, e, n) {
    const i = jt.ancestors(t, e),
      s = i.values.includes(void 0) ? V`` : V`<div class="ancestor vertical connect"></div>`;
    return V` <div class="ancestors"> <div class="ancestors-container">${i}</div> ${s} <jr-person .person="${e}"></jr-person> <div class="connect vertical"></div> <div class="connect horizontal ${n}"></div> </div> `;
  }
  static progenyTemplate(t, e, n, i) {
    const s = t
      .filter(t => t.fatherId === e.id || t.motherId === e.id)
      .sort((t, e) => +t.dateOfBirth.substring(0, 4) - +e.dateOfBirth.substring(0, 4))
      .map((e, i, s) => {
        const r = 1 === s.length ? 'single' : 0 === i ? 'first' : i === s.length - 1 ? 'last' : '';
        return jt.progenyTemplate(t, e, n, r);
      });
    return e.id === n
      ? V`${s}`
      : V` <div class="progeny"> <div class="connect horizontal ${i}"></div> <div class="vertical connect"></div> <jr-person .person="${e}"></jr-person> ${
          s.length ? V`<div class="progeny vertical connect"></div>` : V``
        } <div class="progeny-container">${s}</div> </div> `;
  }
  render() {
    return V` <h1>Stamboom</h1> ${jt.mainPersonTemplate(this.data, this.mainId)} `;
  }
}
t([K({ type: Array })], jt.prototype, 'data', void 0),
  t([K({ type: Number })], jt.prototype, 'mainId', void 0);
class Vt extends tt {
  constructor() {
    super(...arguments), (this.person = {});
  }
  static get styles() {
    return X`.person.main{display:flex;flex-flow:column;height:125px;width:125px;border-style:var(--person-border-style);border-color:var(--person-border-color);border-width:var(--three-quarter-space);margin-left:var(--one-space);margin-right:var(--one-space)}`;
  }
  static isPerson(t) {
    return void 0 !== t.id;
  }
  render() {
    return Vt.isPerson(this.person)
      ? V`<div class="person main">${this.person.firstNames} ${this.person.surname} ${this.person.dateOfBirth}</div>`
      : V``;
  }
}
t([K({ type: Object })], Vt.prototype, 'person', void 0);
class It extends tt {
  constructor() {
    super(), (this.person = {}), this.person;
  }
  static get styles() {
    return X`.person{display:flex;flex-flow:column;height:100px;width:100px;border-style:var(--person-border-style);border-width:var(--person-border-width);border-color:var(--person-border-color);margin-left:var(--one-space);margin-right:var(--one-space)}`;
  }
  static isPerson(t) {
    return void 0 !== t.id;
  }
  render() {
    return It.isPerson(this.person)
      ? V` <a href="${this.person.id}" class="person"> <div>${this.person.firstNames} ${this.person.surname}</div><div>${this.person.dateOfBirth}</div> </a>`
      : V``;
  }
}
t([K({ type: Object })], It.prototype, 'person', void 0),
  customElements.define('jr-family-tree', Rt),
  customElements.define('jr-tree', jt),
  customElements.define('jr-main-person', Vt),
  customElements.define('jr-person', It);
//# sourceMappingURL=jr-family-tree-397b35d7.js.map
