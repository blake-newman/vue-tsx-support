import * as dom from "./dom";
import Vue, { VNode, VNodeData, VNodeChildrenArrayContents } from "vue";
import { ScopedSlotReturnValue, ScopedSlotChildren } from "vue/types/vnode";

declare global {
  namespace VueTsx {
    export interface ComponentAdditionalAttrs {
      // extension point.
    }
    export interface ElementAdditionalAttrs {
      // extension point.
    }
  }
}

export type StringKeyOf<T> = Extract<keyof T, string>;

export type ScopedSlot<P = any> = (props: P) => ScopedSlotReturnValue;
export type ScopedSlotNormalized<P = any> = (props: P) => ScopedSlotChildren;

export type KnownAttrs = Pick<
  VNodeData,
  "class" | "staticClass" | "key" | "ref" | "slot" | "scopedSlots"
> & {
  style?: VNodeData["style"] | string;
  id?: string;
  refInFor?: boolean;
  domPropsInnerHTML?: string;
};
export type ScopedSlots<T> = {
  [K in StringKeyOf<T>]: ScopedSlot<T[K]> | undefined
} & {
  [name: string]: ScopedSlot | undefined;
};

export type ScopedSlotsNormalized<T> = {
  [K in StringKeyOf<T>]: ScopedSlotNormalized<T[K]> | undefined
} & {
  [name: string]: ScopedSlotNormalized | undefined;
};

export type EventHandlers<E> = {
  [K in StringKeyOf<E>]?: E[K] extends Function ? E[K] : (payload: E[K]) => void
};

export type TsxComponentAttrs<TProps = {}, TEvents = {}, TScopedSlots = {}> =
  | ({ props: TProps } & Partial<TProps> &
      KnownAttrs & {
        scopedSlots?: ScopedSlots<TScopedSlots>;
      } & EventHandlers<TEvents> &
      VueTsx.ComponentAdditionalAttrs)
  | (TProps &
      KnownAttrs & {
        scopedSlots?: ScopedSlots<TScopedSlots>;
      } & EventHandlers<TEvents> &
      VueTsx.ComponentAdditionalAttrs);

export type ElementAttrs<T> = T &
  KnownAttrs &
  EventHandlers<dom.EventsOn> &
  VueTsx.ElementAdditionalAttrs;

export interface Element extends VNode {}

export interface ElementClass extends Vue {}

export interface ElementAttributesProperty {
  _tsxattrs: any;
}

export type IntrinsicElements = {
  [K in StringKeyOf<dom.IntrinsicElementAttributes>]: ElementAttrs<
    dom.IntrinsicElementAttributes[K]
  >
};
