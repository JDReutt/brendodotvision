import _ from 'lodash';
import ReactPlayer from 'react-player';
import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'
import { config } from 'config'
import moment from 'moment';



export default class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
        };
    }

    render() {
        const {
            id,
            shortTitle,
            date,
            width,
            height,
            thumbnails,
            shortDescription,
            duration
        } = this.props;

        let player;

        if (this.state.playing) {
            player = ( <
                ReactPlayer url = { `https://www.youtube.com/watch?v=${id}` }
                controls = { true }
                width = { width }
                height = { height }
                playing = { true }
                />
            );
        } else if (this.state.playing) {
            player = ( <
                ReactPlayer url = { `https://www.vimeo.com/watch?v=${id}` }
                controls = { true }
                width = { width }
                height = { height }
                playing = { true }
                />
            );
        } else {
            player = ( <
                div className = "thumb" >
                <
                img src = { thumbnails.medium.url }
                /> <
                div className = "overlay"
                onClick = { this._play.bind(this) } >
                <
                div className = "play" / >
                <
                /div> <
                /div>
            );
        }

        let durationMinutes = (duration / 60) | 0,
            durationSeconds = duration % 60,
            durationStr = `${durationMinutes}m${10 > durationSeconds ? '0' + durationSeconds : durationSeconds}s`;

        let durat

        return ( <
            div className = "video" >
            <
            div className = "player" > { player } <
            /div> <
            div className = "info" >
            <
            div className = "title" > { shortTitle } < /div> <
            div className = "meta" >
            <
            span className = "date" > { moment(date).format('DD MMM YYYY') } < /span> <
            span className = "duration" > { durationStr } < /span> <
            /div> <
            div className = "desc" > { _.truncate(shortDescription, { length: 150 }) } < /div> <
            /div> <
            /div>
        );
    }

    _play(e) {
        this.setState({
            playing: true
        });
    }
}




Video.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    date: React.PropTypes.string,
    thumbnails: React.PropTypes.object,
    shortDescription: React.PropTypes.string,
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    duration: React.PropTypes.number,
    tags: React.PropTypes.array,
};


Video.defaultProps = {
    width: 480,
    height: 360,
};