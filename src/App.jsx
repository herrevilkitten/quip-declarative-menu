import Styles from "./App.less";

import MenuBar from './MenuBar.jsx';
import Menu from './Menu.jsx';
import MainMenu from './MainMenu.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'Hello',
            highlighted: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className={Styles.hello}>
                <input
                    name="highlighted"
                    type="checkbox"
                    checked={this.state.highlighted}
                    onChange={this.handleChange} />
                <input name="label" type="text" value={this.state.label} onChange={this.handleChange} />
                <MenuBar>
                    <MainMenu>
                        <Menu highlighted={this.state.highlighted} label={this.state.label}>

                            <Menu id="submenu" label="Submenu"></Menu>
                        </Menu>
                    </MainMenu>
                    <Menu highlighted={!this.state.highlighted} label={this.state.label + " 2"}></Menu>
                </MenuBar>
                Hello, world!
            </div>
        );
    }
}
