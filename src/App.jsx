import Styles from "./App.less";

import MenuBar from './MenuBar.jsx';
import Menu from './Menu.jsx';
import MainMenu from './MainMenu.jsx';
import MenuSeparator from './MenuSeparator.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'Hello',
            highlighted: false,
            disabled: false,
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

    menuHandler() {
        console.log('I am a menu that has been handled!');
    }

    render() {
        return (
            <div className={Styles.hello}>
                <div className={Styles.formEntry}>
                    <input
                        name="highlighted"
                        type="checkbox"
                        checked={this.state.highlighted}
                        onChange={this.handleChange} />
                    Highlighted
                </div>
                <div className={Styles.formEntry}>
                    <input
                        name="disabled"
                        type="checkbox"
                        checked={this.state.disabled}
                        onChange={this.handleChange} />
                    Disabled
                </div>
                <div className={Styles.formEntry}>
                    <input name="label" type="text" value={this.state.label} onChange={this.handleChange} />
                </div>
                <MenuBar>
                    <MainMenu>
                        <Menu highlighted={this.state.highlighted} label={this.state.label}>
                            <Menu id="submenu" label="Submenu" handler={this.menuHandler}></Menu>
                        </Menu>
                        <MenuSeparator></MenuSeparator>
                    </MainMenu>
                    <MainMenu>
                        <Menu label="Submenu" handler={this.menuHandler} sublabel="hello"></Menu>
                    </MainMenu>
                    <Menu highlighted={!this.state.highlighted} label={this.state.label + " !Highlighted"}></Menu>
                    <Menu disabled={this.state.disabled} label={this.state.label + " Disabled"}></Menu>
                </MenuBar>
                <div>
                    <p>
                        This is a demonstration of declarative, reactive menus for Quip Live Apps.
                        It takes advantage of the React architecture in order to handle the menu state and updates.
                </p>
                    <p>
                        Despite being React components, the menu system does not actually render anything.
                        However, component updates cause the Quip toolbar to be updated.
                </p>
                </div>
            </div>
        );
    }
}
