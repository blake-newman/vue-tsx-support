import Vue, { ComponentOptions, FunctionalComponentOptions, VueConstructor } from "vue";
import { RecordPropsDefinition, ThisTypedComponentOptionsWithRecordProps as ThisTypedComponentOptions } from "vue/types/options";
import { TsxComponentAttrs, StringKeyOf, ScopedSlotsNormalized } from "../types/base";
export { TsxComponentAttrs, ScopedSlots } from "../types/base";
import { EventsNativeOn, AllHTMLAttributes } from "../types/dom";
export { EventsNativeOn, AllHTMLAttributes } from "../types/dom";
export declare type TsxComponentInstance<V extends Vue, Props, EventsWithOn, ScopedSlotArgs> = {
    _tsxattrs: TsxComponentAttrs<Props, EventsWithOn, ScopedSlotArgs>;
} & V;
export declare type TsxComponent<V extends Vue, Props = {}, EventsWithOn = {}, ScopedSlotArgs = {}, AdditionalThisAttrs = {}> = VueConstructor<TsxComponentInstance<V, Props, EventsWithOn, ScopedSlotArgs> & AdditionalThisAttrs>;
export declare class Component<Props, EventsWithOn = {}, ScopedSlotArgs = {}> extends Vue {
    _tsxattrs: TsxComponentAttrs<Props, EventsWithOn, ScopedSlotArgs>;
    $scopedSlots: ScopedSlotsNormalized<ScopedSlotArgs>;
}
/**
 * Create component from component options (Compatible with Vue.extend)
 */
export declare function createComponent<TProps, TEvents = {}, TScopedSlots = {}>(opts: ComponentOptions<Vue> | FunctionalComponentOptions): TsxComponent<Vue, TProps, TEvents, TScopedSlots>;
export interface Factory<TProps, TEvents, TScopedSlots> {
    convert<V extends Vue>(componentType: new (...args: any[]) => V): TsxComponent<V, TProps, TEvents, TScopedSlots>;
    extendFrom<VC extends typeof Vue>(componentType: VC): TsxComponent<InstanceType<VC>, TProps, TEvents, TScopedSlots>;
}
/**
 * Specify Props and Event types of component
 *
 * Usage:
 *  // Get TSX-supported component with props(`name`, `value`) and event(`onInput`)
 *  const NewComponent = tsx.ofType<{ name: string, value: string }, { onInput: string }>.convert(Component);
 */
export declare function ofType<TProps, TEvents = {}, TScopedSlots = {}>(): Factory<TProps, TEvents, TScopedSlots>;
export declare function withNativeOn<VC extends typeof Vue>(componentType: VC): TsxComponent<InstanceType<VC>, {}, EventsNativeOn, {}>;
export declare function withHtmlAttrs<VC extends typeof Vue>(componentType: VC): TsxComponent<InstanceType<VC>, AllHTMLAttributes, {}, {}>;
export declare function withUnknownProps<VC extends typeof Vue>(componentType: VC): TsxComponent<InstanceType<VC>, {
    [key: string]: any;
}, {}, {}>;
/**
 * Experimental support for new typings introduced from Vue 2.5
 * Depending on some private types of vue, which may be changed by upgrade :(
 */
export declare type RequiredPropNames<PropsDef extends RecordPropsDefinition<any>> = ({
    [K in StringKeyOf<PropsDef>]: PropsDef[K] extends {
        required: true;
    } ? K : never;
})[StringKeyOf<PropsDef>];
export declare type PropsForOutside<Props, RequiredPropNames extends StringKeyOf<Props>> = {
    [K in RequiredPropNames]: Props[K];
} & {
    [K in Exclude<StringKeyOf<Props>, RequiredPropNames>]?: Props[K];
};
export interface ComponentFactory<BaseProps, EventsWithOn, ScopedSlotArgs, AdditionalThisAttrs, Super extends Vue> {
    create<Props, PropsDef extends RecordPropsDefinition<Props>, RequiredProps extends StringKeyOf<Props> = RequiredPropNames<PropsDef> & StringKeyOf<Props>>(options: FunctionalComponentOptions<Props, PropsDef & RecordPropsDefinition<Props>>, requiredProps?: RequiredProps[]): TsxComponent<Super, PropsForOutside<Props, RequiredProps> & BaseProps, EventsWithOn, ScopedSlotArgs, Props>;
    create<Data, Methods, Computed, Props, PropsDef extends RecordPropsDefinition<Props>, RequiredProps extends StringKeyOf<Props> = RequiredPropNames<PropsDef> & StringKeyOf<Props>>(options: ThisTypedComponentOptions<AdditionalThisAttrs & Super & Vue, Data, Methods, Computed, Props> & {
        props?: PropsDef;
    }, requiredPropsNames?: RequiredProps[]): TsxComponent<Super, PropsForOutside<Props, RequiredProps> & BaseProps, EventsWithOn, ScopedSlotArgs, Data & Methods & Computed & Props>;
    mixin<Data, Methods, Computed, Props>(mixinObject: ThisTypedComponentOptions<Vue, Data, Methods, Computed, Props>): ComponentFactory<BaseProps & Props, EventsWithOn, ScopedSlotArgs, AdditionalThisAttrs & Data & Methods & Computed & Props, Super>;
    mixin<VC extends typeof Vue>(mixinObject: VC): ComponentFactory<BaseProps, EventsWithOn, ScopedSlotArgs, AdditionalThisAttrs & {
        $scopedSlots: ScopedSlotsNormalized<ScopedSlotArgs>;
    }, InstanceType<VC> & Super>;
}
export interface ExtendableComponentFactory<BaseProps, EventsWithOn, ScopedSlotArgs, AdditionalThisAttrs, Super extends Vue> extends ComponentFactory<BaseProps, EventsWithOn, ScopedSlotArgs, AdditionalThisAttrs, Super> {
    extendFrom<VC extends typeof Vue>(componentType: VC): ComponentFactory<BaseProps, EventsWithOn, ScopedSlotArgs, AdditionalThisAttrs & {
        $scopedSlots: ScopedSlotsNormalized<ScopedSlotArgs>;
    }, InstanceType<VC>>;
}
export declare const componentFactory: ExtendableComponentFactory<{}, {}, {}, {}, Vue>;
export declare function componentFactoryOf<EventsWithOn = {}, ScopedSlotArgs = {}>(): ComponentFactory<{}, EventsWithOn, ScopedSlotArgs, {
    $scopedSlots: ScopedSlotsNormalized<ScopedSlotArgs>;
}, Vue>;
/**
 * Shorthand of `componentFactory.create`
 */
export declare const component: {
    <Props, PropsDef extends RecordPropsDefinition<Props>, RequiredProps extends Extract<keyof Props, string> = { [K in Extract<keyof PropsDef, string>]: PropsDef[K] extends {
        required: true;
    } ? K : never; }[Extract<keyof PropsDef, string>] & Extract<keyof Props, string>>(options: FunctionalComponentOptions<Props, PropsDef & RecordPropsDefinition<Props>>, requiredProps?: RequiredProps[] | undefined): VueConstructor<{
        _tsxattrs: TsxComponentAttrs<{ [K in RequiredProps]: Props[K]; } & { [K in Exclude<Extract<keyof Props, string>, RequiredProps>]?: Props[K] | undefined; }, {}, {}>;
    } & Vue & Props>;
    <Data, Methods, Computed, Props, PropsDef extends RecordPropsDefinition<Props>, RequiredProps extends Extract<keyof Props, string> = { [K in Extract<keyof PropsDef, string>]: PropsDef[K] extends {
        required: true;
    } ? K : never; }[Extract<keyof PropsDef, string>] & Extract<keyof Props, string>>(options: object & ComponentOptions<Vue, Data | ((this: Readonly<Props> & Vue) => Data), Methods, Computed, RecordPropsDefinition<Props>, Props> & ThisType<Data & Methods & Computed & Readonly<Props> & Vue> & {
        props?: PropsDef | undefined;
    }, requiredPropsNames?: RequiredProps[] | undefined): VueConstructor<{
        _tsxattrs: TsxComponentAttrs<{ [K in RequiredProps]: Props[K]; } & { [K in Exclude<Extract<keyof Props, string>, RequiredProps>]?: Props[K] | undefined; }, {}, {}>;
    } & Vue & Data & Methods & Computed & Props>;
};
export declare const extendFrom: <VC extends VueConstructor<Vue>>(componentType: VC) => ComponentFactory<{}, {}, {}, {
    $scopedSlots: ScopedSlotsNormalized<{}>;
}, InstanceType<VC>>;
