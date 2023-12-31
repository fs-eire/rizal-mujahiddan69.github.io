/*!
 * ONNX Runtime Common v1.15.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
(() => {
  "use strict";
  var t = {
      d: (e, r) => {
        for (var i in r)
          t.o(r, i) &&
            !t.o(e, i) &&
            Object.defineProperty(e, i, {
              enumerable: !0,
              get: r[i],
            });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module",
          }),
          Object.defineProperty(t, "__esModule", {
            value: !0,
          });
      },
    },
    e = {};
  t.r(e),
    t.d(e, {
      InferenceSession: () => l,
      Tensor: () => f,
      env: () => o,
      registerBackend: () => n,
    });
  const r = {},
    i = [],
    n = (t, e, n) => {
      if (
        !e ||
        "function" != typeof e.init ||
        "function" != typeof e.createSessionHandler
      )
        throw new TypeError("not a valid backend");
      {
        const o = r[t];
        if (void 0 === o)
          r[t] = {
            backend: e,
            priority: n,
          };
        else {
          if (o.priority > n) return;
          if (o.priority === n && o.backend !== e)
            throw new Error(
              `cannot register backend "${t}" using priority ${n}`
            );
        }
        if (n >= 0) {
          const e = i.indexOf(t);
          -1 !== e && i.splice(e, 1);
          for (let e = 0; e < i.length; e++)
            if (r[i[e]].priority <= n) return void i.splice(e, 0, t);
          i.push(t);
        }
      }
    },
    o = new (class {
      constructor() {
        (this.wasm = {}),
          (this.webgl = {}),
          (this.webgpu = {}),
          (this.logLevelInternal = "warning");
      }
      set logLevel(t) {
        if (void 0 !== t) {
          if (
            "string" != typeof t ||
            -1 === ["verbose", "info", "warning", "error", "fatal"].indexOf(t)
          )
            throw new Error(`Unsupported logging level: ${t}`);
          this.logLevelInternal = t;
        }
      }
      get logLevel() {
        return this.logLevelInternal;
      }
    })(),
    a = new Map([
      ["float32", Float32Array],
      ["uint8", Uint8Array],
      ["int8", Int8Array],
      ["uint16", Uint16Array],
      ["int16", Int16Array],
      ["int32", Int32Array],
      ["bool", Uint8Array],
      ["float64", Float64Array],
      ["uint32", Uint32Array],
    ]),
    s = new Map([
      [Float32Array, "float32"],
      [Uint8Array, "uint8"],
      [Int8Array, "int8"],
      [Uint16Array, "uint16"],
      [Int16Array, "int16"],
      [Int32Array, "int32"],
      [Float64Array, "float64"],
      [Uint32Array, "uint32"],
    ]);
  let d = !1;
  class h {
    constructor(t, e, r) {
      let i, n, o;
      if (
        ((() => {
          if (!d) {
            d = !0;
            const t =
                "undefined" != typeof BigInt64Array &&
                "function" == typeof BigInt64Array.from,
              e =
                "undefined" != typeof BigUint64Array &&
                "function" == typeof BigUint64Array.from;
            t && (a.set("int64", BigInt64Array), s.set(BigInt64Array, "int64")),
              e &&
                (a.set("uint64", BigUint64Array),
                s.set(BigUint64Array, "uint64"));
          }
        })(),
        "string" == typeof t)
      )
        if (((i = t), (o = r), "string" === t)) {
          if (!Array.isArray(e))
            throw new TypeError(
              "A string tensor's data must be a string array."
            );
          n = e;
        } else {
          const r = a.get(t);
          if (void 0 === r)
            throw new TypeError(`Unsupported tensor type: ${t}.`);
          if (Array.isArray(e)) n = r.from(e);
          else {
            if (!(e instanceof r))
              throw new TypeError(`A ${i} tensor's data must be type of ${r}`);
            n = e;
          }
        }
      else if (((o = e), Array.isArray(t))) {
        if (0 === t.length)
          throw new TypeError(
            "Tensor type cannot be inferred from an empty array."
          );
        const e = typeof t[0];
        if ("string" === e) (i = "string"), (n = t);
        else {
          if ("boolean" !== e)
            throw new TypeError(`Invalid element type of data array: ${e}.`);
          (i = "bool"), (n = Uint8Array.from(t));
        }
      } else {
        const e = s.get(t.constructor);
        if (void 0 === e)
          throw new TypeError(
            `Unsupported type for tensor data: ${t.constructor}.`
          );
        (i = e), (n = t);
      }
      if (void 0 === o) o = [n.length];
      else if (!Array.isArray(o))
        throw new TypeError("A tensor's dims must be a number array");
      const h = ((t) => {
        let e = 1;
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          if ("number" != typeof i || !Number.isSafeInteger(i))
            throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);
          if (i < 0)
            throw new RangeError(
              `dims[${r}] must be a non-negative integer, got: ${i}`
            );
          e *= i;
        }
        return e;
      })(o);
      if (h !== n.length)
        throw new Error(
          `Tensor's size(${h}) does not match data length(${n.length}).`
        );
      (this.dims = o), (this.type = i), (this.data = n), (this.size = h);
    }
    static bufferToTensor(t, e) {
      var r, i, n;
      if (void 0 === t) throw new Error("Image buffer must be defined");
      if (void 0 === e.height || void 0 === e.width)
        throw new Error("Image height and width must be defined");
      if ("NHWC" === e.tensorLayout)
        throw new Error("NHWC Tensor layout is not supported yet");
      const { height: o, width: a } = e,
        s =
          null !== (r = e.norm) && void 0 !== r
            ? r
            : {
                mean: 255,
                bias: 0,
              };
      let d, f;
      (d =
        "number" == typeof s.mean
          ? [s.mean, s.mean, s.mean, s.mean]
          : [
              s.mean[0],
              s.mean[1],
              s.mean[2],
              null !== (i = s.mean[3]) && void 0 !== i ? i : 255,
            ]),
        (f =
          "number" == typeof s.bias
            ? [s.bias, s.bias, s.bias, s.bias]
            : [
                s.bias[0],
                s.bias[1],
                s.bias[2],
                null !== (n = s.bias[3]) && void 0 !== n ? n : 0,
              ]);
      const m = void 0 !== e.bitmapFormat ? e.bitmapFormat : "RGBA",
        l =
          void 0 !== e.tensorFormat && void 0 !== e.tensorFormat
            ? e.tensorFormat
            : "RGB",
        g = o * a,
        c = "RGBA" === l ? new Float32Array(4 * g) : new Float32Array(3 * g);
      let u = 4,
        w = 0,
        y = 1,
        p = 2,
        b = 3,
        v = 0,
        E = g,
        A = 2 * g,
        I = -1;
      "RGB" === m && ((u = 3), (w = 0), (y = 1), (p = 2), (b = -1)),
        "RGBA" === l
          ? (I = 3 * g)
          : "RBG" === l
          ? ((v = 0), (A = g), (E = 2 * g))
          : "BGR" === l && ((A = 0), (E = g), (v = 2 * g));
      for (let e = 0; e < g; e++, w += u, p += u, y += u, b += u)
        (c[v++] = (t[w] + f[0]) / d[0]),
          (c[E++] = (t[y] + f[1]) / d[1]),
          (c[A++] = (t[p] + f[2]) / d[2]),
          -1 !== I && -1 !== b && (c[I++] = (t[b] + f[3]) / d[3]);
      return new h("float32", c, "RGBA" === l ? [1, 4, o, a] : [1, 3, o, a]);
    }
    static async fromImage(t, e) {
      const r =
          "undefined" != typeof HTMLImageElement &&
          t instanceof HTMLImageElement,
        i = "undefined" != typeof ImageData && t instanceof ImageData,
        n = "undefined" != typeof ImageBitmap && t instanceof ImageBitmap,
        o = "string" == typeof t;
      let a,
        s = null != e ? e : {};
      if (r) {
        const r = document.createElement("canvas");
        (r.width = t.width), (r.height = t.height);
        const i = r.getContext("2d");
        if (null == i) throw new Error("Can not access image data");
        {
          let r = t.height,
            n = t.width;
          if (
            (void 0 !== e &&
              void 0 !== e.resizedHeight &&
              void 0 !== e.resizedWidth &&
              ((r = e.resizedHeight), (n = e.resizedWidth)),
            void 0 !== e)
          ) {
            if (((s = e), void 0 !== e.tensorFormat))
              throw new Error(
                "Image input config format must be RGBA for HTMLImageElement"
              );
            if (
              ((s.tensorFormat = "RGBA"), void 0 !== e.height && e.height !== r)
            )
              throw new Error(
                "Image input config height doesn't match HTMLImageElement height"
              );
            if (((s.height = r), void 0 !== e.width && e.width !== n))
              throw new Error(
                "Image input config width doesn't match HTMLImageElement width"
              );
            s.width = n;
          } else (s.tensorFormat = "RGBA"), (s.height = r), (s.width = n);
          i.drawImage(t, 0, 0), (a = i.getImageData(0, 0, n, r).data);
        }
      } else {
        if (!i) {
          if (n) {
            if (void 0 === e)
              throw new Error(
                "Please provide image config with format for Imagebitmap"
              );
            if (void 0 !== e.bitmapFormat)
              throw new Error(
                "Image input config format must be defined for ImageBitmap"
              );
            const r = document.createElement("canvas").getContext("2d");
            if (null != r) {
              const i = t.height,
                n = t.width;
              if (
                (r.drawImage(t, 0, 0, n, i),
                (a = r.getImageData(0, 0, n, i).data),
                void 0 !== e)
              ) {
                if (void 0 !== e.height && e.height !== i)
                  throw new Error(
                    "Image input config height doesn't match ImageBitmap height"
                  );
                if (((s.height = i), void 0 !== e.width && e.width !== n))
                  throw new Error(
                    "Image input config width doesn't match ImageBitmap width"
                  );
                s.width = n;
              } else (s.height = i), (s.width = n);
              return h.bufferToTensor(a, s);
            }
            throw new Error("Can not access image data");
          }
          if (o)
            return new Promise((r, i) => {
              const n = document.createElement("canvas"),
                o = n.getContext("2d");
              if (!t || !o) return i();
              const a = new Image();
              (a.crossOrigin = "Anonymous"),
                (a.src = t),
                (a.onload = () => {
                  (n.width = a.width),
                    (n.height = a.height),
                    o.drawImage(a, 0, 0, n.width, n.height);
                  const t = o.getImageData(0, 0, n.width, n.height);
                  if (void 0 !== e) {
                    if (void 0 !== e.height && e.height !== n.height)
                      throw new Error(
                        "Image input config height doesn't match height"
                      );
                    if (
                      ((s.height = n.height),
                      void 0 !== e.width && e.width !== n.width)
                    )
                      throw new Error(
                        "Image input config width doesn't match width"
                      );
                    s.width = n.width;
                  } else (s.height = n.height), (s.width = n.width);
                  r(h.bufferToTensor(t.data, s));
                });
            });
          throw new Error(
            "Input data provided is not supported - aborted tensor creation"
          );
        }
        {
          const r = "RGBA";
          let i, n;
          if (
            (void 0 !== e &&
            void 0 !== e.resizedWidth &&
            void 0 !== e.resizedHeight
              ? ((i = e.resizedHeight), (n = e.resizedWidth))
              : ((i = t.height), (n = t.width)),
            void 0 !== e)
          ) {
            if (((s = e), void 0 !== e.bitmapFormat && e.bitmapFormat !== r))
              throw new Error(
                "Image input config format must be RGBA for ImageData"
              );
            s.bitmapFormat = "RGBA";
          } else s.bitmapFormat = "RGBA";
          if (((s.height = i), (s.width = n), void 0 !== e)) {
            const e = document.createElement("canvas");
            (e.width = n), (e.height = i);
            const r = e.getContext("2d");
            if (null == r) throw new Error("Can not access image data");
            r.putImageData(t, 0, 0), (a = r.getImageData(0, 0, n, i).data);
          } else a = t.data;
        }
      }
      if (void 0 !== a) return h.bufferToTensor(a, s);
      throw new Error(
        "Input data provided is not supported - aborted tensor creation"
      );
    }
    toDataURL(t) {
      const e = document.createElement("canvas");
      (e.width = this.dims[3]), (e.height = this.dims[2]);
      const r = e.getContext("2d");
      if (null != r) {
        let i, n;
        void 0 !== (null == t ? void 0 : t.tensorLayout) &&
        "NHWC" === t.tensorLayout
          ? ((i = this.dims[2]), (n = this.dims[3]))
          : ((i = this.dims[3]), (n = this.dims[2]));
        const o = void 0 !== (null == t ? void 0 : t.format) ? t.format : "RGB",
          a = null == t ? void 0 : t.norm;
        let s, d;
        void 0 === a || void 0 === a.mean
          ? (s = [255, 255, 255, 255])
          : "number" == typeof a.mean
          ? (s = [a.mean, a.mean, a.mean, a.mean])
          : ((s = [a.mean[0], a.mean[1], a.mean[2], 0]),
            void 0 !== a.mean[3] && (s[3] = a.mean[3])),
          void 0 === a || void 0 === a.bias
            ? (d = [0, 0, 0, 0])
            : "number" == typeof a.bias
            ? (d = [a.bias, a.bias, a.bias, a.bias])
            : ((d = [a.bias[0], a.bias[1], a.bias[2], 0]),
              void 0 !== a.bias[3] && (d[3] = a.bias[3]));
        const h = n * i;
        let f = 0,
          m = h,
          l = 2 * h,
          g = -1;
        "RGBA" === o
          ? ((f = 0), (m = h), (l = 2 * h), (g = 3 * h))
          : "RGB" === o
          ? ((f = 0), (m = h), (l = 2 * h))
          : "RBG" === o && ((f = 0), (l = h), (m = 2 * h));
        for (let t = 0; t < n; t++)
          for (let e = 0; e < i; e++) {
            const i = (this.data[f++] - d[0]) * s[0],
              n = (this.data[m++] - d[1]) * s[1],
              o = (this.data[l++] - d[2]) * s[2],
              a = -1 === g ? 255 : (this.data[g++] - d[3]) * s[3];
            (r.fillStyle = "rgba(" + i + "," + n + "," + o + "," + a + ")"),
              r.fillRect(e, t, 1, 1);
          }
        return e.toDataURL();
      }
      throw new Error("Can not access image data");
    }
    toImageData(t) {
      const e = document.createElement("canvas").getContext("2d");
      let r;
      if (null == e) throw new Error("Can not access image data");
      {
        let i, n, o;
        void 0 !== (null == t ? void 0 : t.tensorLayout) &&
        "NHWC" === t.tensorLayout
          ? ((i = this.dims[2]), (n = this.dims[1]), (o = this.dims[3]))
          : ((i = this.dims[3]), (n = this.dims[2]), (o = this.dims[1]));
        const a = void 0 !== t && void 0 !== t.format ? t.format : "RGB",
          s = null == t ? void 0 : t.norm;
        let d, h;
        void 0 === s || void 0 === s.mean
          ? (d = [255, 255, 255, 255])
          : "number" == typeof s.mean
          ? (d = [s.mean, s.mean, s.mean, s.mean])
          : ((d = [s.mean[0], s.mean[1], s.mean[2], 255]),
            void 0 !== s.mean[3] && (d[3] = s.mean[3])),
          void 0 === s || void 0 === s.bias
            ? (h = [0, 0, 0, 0])
            : "number" == typeof s.bias
            ? (h = [s.bias, s.bias, s.bias, s.bias])
            : ((h = [s.bias[0], s.bias[1], s.bias[2], 0]),
              void 0 !== s.bias[3] && (h[3] = s.bias[3]));
        const f = n * i;
        if (void 0 !== t) {
          if (void 0 !== t.height && t.height !== n)
            throw new Error(
              "Image output config height doesn't match tensor height"
            );
          if (void 0 !== t.width && t.width !== i)
            throw new Error(
              "Image output config width doesn't match tensor width"
            );
          if (
            (void 0 !== t.format && 4 === o && "RGBA" !== t.format) ||
            (3 === o && "RGB" !== t.format && "BGR" !== t.format)
          )
            throw new Error("Tensor format doesn't match input tensor dims");
        }
        const m = 4;
        let l = 0,
          g = 1,
          c = 2,
          u = 3,
          w = 0,
          y = f,
          p = 2 * f,
          b = -1;
        "RGBA" === a
          ? ((w = 0), (y = f), (p = 2 * f), (b = 3 * f))
          : "RGB" === a
          ? ((w = 0), (y = f), (p = 2 * f))
          : "RBG" === a && ((w = 0), (p = f), (y = 2 * f)),
          (r = e.createImageData(i, n));
        for (let t = 0; t < n * i; l += m, g += m, c += m, u += m, t++)
          (r.data[l] = (this.data[w++] - h[0]) * d[0]),
            (r.data[g] = (this.data[y++] - h[1]) * d[1]),
            (r.data[c] = (this.data[p++] - h[2]) * d[2]),
            (r.data[u] = -1 === b ? 255 : (this.data[b++] - h[3]) * d[3]);
      }
      return r;
    }
    reshape(t) {
      return new h(this.type, this.data, t);
    }
  }
  const f = h;
  class m {
    constructor(t) {
      this.handler = t;
    }
    async run(t, e, r) {
      const i = {};
      let n = {};
      if (
        "object" != typeof t ||
        null === t ||
        t instanceof f ||
        Array.isArray(t)
      )
        throw new TypeError(
          "'feeds' must be an object that use input names as keys and OnnxValue as corresponding values."
        );
      let o = !0;
      if ("object" == typeof e) {
        if (null === e)
          throw new TypeError("Unexpected argument[1]: cannot be null.");
        if (e instanceof f) throw new TypeError("'fetches' cannot be a Tensor");
        if (Array.isArray(e)) {
          if (0 === e.length)
            throw new TypeError("'fetches' cannot be an empty array.");
          o = !1;
          for (const t of e) {
            if ("string" != typeof t)
              throw new TypeError(
                "'fetches' must be a string array or an object."
              );
            if (-1 === this.outputNames.indexOf(t))
              throw new RangeError(
                `'fetches' contains invalid output name: ${t}.`
              );
            i[t] = null;
          }
          if ("object" == typeof r && null !== r) n = r;
          else if (void 0 !== r)
            throw new TypeError("'options' must be an object.");
        } else {
          let t = !1;
          const a = Object.getOwnPropertyNames(e);
          for (const r of this.outputNames)
            if (-1 !== a.indexOf(r)) {
              const n = e[r];
              (null === n || n instanceof f) &&
                ((t = !0), (o = !1), (i[r] = n));
            }
          if (t) {
            if ("object" == typeof r && null !== r) n = r;
            else if (void 0 !== r)
              throw new TypeError("'options' must be an object.");
          } else n = e;
        }
      } else if (void 0 !== e)
        throw new TypeError(
          "Unexpected argument[1]: must be 'fetches' or 'options'."
        );
      for (const e of this.inputNames)
        if (void 0 === t[e])
          throw new Error(`input '${e}' is missing in 'feeds'.`);
      if (o) for (const t of this.outputNames) i[t] = null;
      const a = await this.handler.run(t, i, n),
        s = {};
      for (const t in a)
        Object.hasOwnProperty.call(a, t) &&
          (s[t] = new f(a[t].type, a[t].data, a[t].dims));
      return s;
    }
    static async create(t, e, n, o) {
      let a,
        s = {};
      if ("string" == typeof t) {
        if (((a = t), "object" == typeof e && null !== e)) s = e;
        else if (void 0 !== e)
          throw new TypeError("'options' must be an object.");
      } else if (t instanceof Uint8Array) {
        if (((a = t), "object" == typeof e && null !== e)) s = e;
        else if (void 0 !== e)
          throw new TypeError("'options' must be an object.");
      } else {
        if (
          !(
            t instanceof ArrayBuffer ||
            ("undefined" != typeof SharedArrayBuffer &&
              t instanceof SharedArrayBuffer)
          )
        )
          throw new TypeError(
            "Unexpected argument[0]: must be 'path' or 'buffer'."
          );
        {
          const r = t;
          let i = 0,
            d = t.byteLength;
          if ("object" == typeof e && null !== e) s = e;
          else if ("number" == typeof e) {
            if (((i = e), !Number.isSafeInteger(i)))
              throw new RangeError("'byteOffset' must be an integer.");
            if (i < 0 || i >= r.byteLength)
              throw new RangeError(
                `'byteOffset' is out of range [0, ${r.byteLength}).`
              );
            if (((d = t.byteLength - i), "number" == typeof n)) {
              if (((d = n), !Number.isSafeInteger(d)))
                throw new RangeError("'byteLength' must be an integer.");
              if (d <= 0 || i + d > r.byteLength)
                throw new RangeError(
                  `'byteLength' is out of range (0, ${r.byteLength - i}].`
                );
              if ("object" == typeof o && null !== o) s = o;
              else if (void 0 !== o)
                throw new TypeError("'options' must be an object.");
            } else if (void 0 !== n)
              throw new TypeError("'byteLength' must be a number.");
          } else if (void 0 !== e)
            throw new TypeError("'options' must be an object.");
          a = new Uint8Array(r, i, d);
        }
      }
      const d = (s.executionProviders || []).map((t) =>
          "string" == typeof t ? t : t.name
        ),
        h = await (async (t) => {
          const e = 0 === t.length ? i : t,
            n = [];
          for (const t of e) {
            const e = r[t];
            if (e) {
              if (e.initialized) return e.backend;
              if (e.aborted) continue;
              const r = !!e.initPromise;
              try {
                return (
                  r || (e.initPromise = e.backend.init()),
                  await e.initPromise,
                  (e.initialized = !0),
                  e.backend
                );
              } catch (i) {
                r ||
                  n.push({
                    name: t,
                    err: i,
                  }),
                  (e.aborted = !0);
              } finally {
                delete e.initPromise;
              }
            }
          }
          throw new Error(
            `no available backend found. ERR: ${n
              .map((t) => `[${t.name}] ${t.err}`)
              .join(", ")}`
          );
        })(d),
        f = await h.createSessionHandler(a, s);
      return new m(f);
    }
    startProfiling() {
      this.handler.startProfiling();
    }
    endProfiling() {
      this.handler.endProfiling();
    }
    get inputNames() {
      return this.handler.inputNames;
    }
    get outputNames() {
      return this.handler.outputNames;
    }
  }
  const l = m;
  var g = exports;
  for (var c in e) g[c] = e[c];
  e.__esModule &&
    Object.defineProperty(g, "__esModule", {
      value: !0,
    });
})();
//# sourceMappingURL=ort-common.node.js.map
