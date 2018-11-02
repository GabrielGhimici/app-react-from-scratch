import * as React from "react";
import './Hello.scss';

export interface HelloProps {
    compiler: string;
    framework: string;
}

export default class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1 className="try-scss">Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
