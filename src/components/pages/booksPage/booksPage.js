import React from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends React.Component {
    state = {
        selectedItem: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    onItemSelected = id => {
        this.setState({
            selectedItem: id
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name} />
        );

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem} getData={this.gotService.getBook}>
                <Field field="numberOfPages" label="Number Of Pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails} />
        );
    }
}