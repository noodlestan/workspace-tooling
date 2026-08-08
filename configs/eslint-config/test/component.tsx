import { Component } from 'solid-js';

type Props = {
    foo: string;
};

export const component: Component<Props> = props => {
    //
    // const foo = props.foo;

    if (Math.random()) {
        return;
    }
    return <>{props.foo}</>;
};
