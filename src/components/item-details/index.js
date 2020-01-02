import React, { Component } from 'react';

import './item-details.css';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        const {getImageUrl} = this.props;

        this.setState({
            item,
            image: getImageUrl(item),
            loading: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updateItem = () => {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        });

        getData(itemId)
            .then(this.onItemLoaded)
            .catch(this.onError);
    };

    render() {

        const {item, image, loading, error } = this.state;

        if (!item && !error) {
            return <span>Select an item from a list.</span>;
        }



        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading  ? <Spinner /> : null;
        const content = hasData ? <ItemView item={item}
                                            image={image}
                                            children={ this.props.children }/> : null;

        return (
            <div className="item-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>

        );
    }
}

const ItemView = ({item, image, children}) => {

    const {name} = item;

    return (
        <React.Fragment>
            <img className="item-image"
                 src={image} alt="character"/>
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    { React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item});
                    })}
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
};