import * as React from "react";
import './App.scss';

export interface HelloProps {
    compiler: string;
    framework: string;
}

export default class App extends React.Component<HelloProps, {}> {
    render() {
        return (
          <div>
            <h1 className="try-scss">Hello from {this.props.framework} {this.props.compiler}!</h1>
            <div>
              <button>Add</button>
            </div>
          </div>
        );
    }
}
