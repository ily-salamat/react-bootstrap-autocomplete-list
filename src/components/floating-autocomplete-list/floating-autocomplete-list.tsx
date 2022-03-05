import { Dropdown } from "bootstrap";
import { Component, KeyboardEvent, MouseEvent } from "react";

type Props = typeof BS5FloatingAutocompleteList.defaultProps & {
    defaultValue?: string,
    id?: string,
    label?: string,
    list?: string[],
    startAt?: number,
    selectedValue?: (value: string) => any,
    valueOnChange?: (value: string) => any,
    maxHeight?: string
}

type State = {
    value: string,
    list: string[]
}

export default class BS5FloatingAutocompleteList extends Component<Props, State> {

    static defaultProps = {
        id: 'autocompleteList',
        label: 'Autocomplete List',
        startAt: 0,
        maxHeight: '200px',
        list: ['Item 1', 'Item 2', 'Item 3'],
        selectedValue: (valie: string) => { },
        valueOnChange: (valie: string) => { }
    };

    dropdown: Dropdown | undefined;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.defaultValue || '',
            list: [],
        };
        this.valueOnChange = this.valueOnChange.bind(this);
        this.selectedValue = this.selectedValue.bind(this);
        this.inputClick = this.inputClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this)
    }

    componentDidMount() {
        this.loadList(this.state.value);

        // Call dropdown via JavaScript
        import("bootstrap").then((bs) => {
            const dropdownElm = document.getElementById(this.props.id + 'Input');
            if (dropdownElm) {
                this.dropdown = new bs.Dropdown(dropdownElm);
            }
        })
    }

    loadList(value: string) {
        let list: string[] = []

        if (value.length >= this.props.startAt) {

            // Find values
            list = this.props.list.filter((item: string) => {
                return item.toLowerCase().includes(value.toLowerCase());
            })

            // Insert bold tag
            if (value.length > 0) {
                list = list.map((item) => {
                    const valueIndex = item.toLowerCase().indexOf(value.toLowerCase());
                    const newItem = item.substring(0, valueIndex) + '<b>' + item.substring(valueIndex, valueIndex + value.length) + '</b>' + item.substring(valueIndex + value.length);
                    return newItem;
                });
            }

            this.setState({ list });
        } else {
            this.setState({ list });
        }
    }

    valueOnChange(event: { target: HTMLInputElement }) {
        const value = event.target.value;
        this.setState({ value });
        this.loadList(value);

        // Send on change value
        if ('valueOnChange' in this.props) {
            this.props.valueOnChange(value);
        }
    }

    selectedValue(index: number, event?: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {

        event?.preventDefault();

        // Remove bold tag
        const value = this.state.list[index].replace(/<b>|<\/b>/gi, '')
        this.setState({ value });
        this.loadList(value);

        // Send selected value
        if ('selectedValue' in this.props) {
            this.props.selectedValue(value);
        }
    }

    async inputClick() {
        this.dropdown?.show();
    }

    onKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' && this.state.list.length === 1) {
            this.selectedValue(0);
            this.dropdown?.hide();
        }
    }

    render() {
        return (
            <div className="form-floating" id={this.props.id}>
                <input type="text" value={this.state.value} onKeyPress={this.onKeyPress} onChange={this.valueOnChange} className="form-control" onClick={this.inputClick}
                    id={this.props.id + 'Input'} placeholder={this.props.label} data-bs-toggle="dropdown" autoComplete="off" data-bs-display="static" />
                <label htmlFor={this.props.id + 'input'}>{this.props.label}</label>
                <ul id={this.props.id + 'Dropdown'} className="dropdown-menu w-100" style={{ maxHeight: this.props.maxHeight, overflowY: 'auto' }} hidden={this.state.list.length === 0 ? true : false}>
                    {
                        this.state.list.map((item, index) => {
                            return <li key={index}><a className="dropdown-item" href="#0" onClick={(event) => this.selectedValue(index, event)} dangerouslySetInnerHTML={{ __html: item }}></a></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}