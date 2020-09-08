import React, {Component} from 'react';
import DashboardNewsEntry from "./components/DashboardNewsEntry";
import PropTypes from 'prop-types'
import SmallLoading from "../../../../../../components/reusables/SmallLoading";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";
/**
 * Displays the news about courses to which the user is subscribed
 * @memberOf components.views.classroom.Dashboard
 * @component
 */
class DashboardNews extends Component {

    onLoadMore = (e) => {
        e.preventDefault();
        this.props.onLoadMore();
    }

    render() {
        let { updatesData, noMoreUpdates, loadingMore, loadingNew } = this.props;
        if (!updatesData || loadingNew){
            return (<BigLoadingCentered />)
        }
        return (
            <div>
                {updatesData && updatesData.map((update, i) => {
                    if (!update.data || !update.course){
                        return <div key={i}>[No data]</div>
                    }
                    let timeStr;
                    try {
                        let time = new Date(update.data.created);
                        timeStr =
                            `on ${time.toLocaleDateString()} at ` +
                            `${time.toLocaleTimeString().substring(0, 5)}`;
                    } catch (e) {
                        timeStr = '';
                    }
                    return (
                        <div key={i}>
                            <DashboardNewsEntry
                                courseId={update.course.id}
                                courseName={update.course.name}
                                {...update.data}
                                timeString={timeStr}
                            />
                            <hr />
                        </div>
                    )
                })}
                {noMoreUpdates ? (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        No more news
                    </div>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {loadingMore ? (
                            <SmallLoading />
                        ) : (
                            <button
                                className="btn btn-outline p-2"
                                type="button"
                                onClick={this.onLoadMore}
                            >
                                load more
                            </button>
                        )}

                    </div>
                )}
            </div>
        );
    }
}
DashboardNews.propTypes = {
    /**
     * Action that should load more news entries
     * on demand
     */
    onLoadMore: PropTypes.func.isRequired,
    /**
     * True if it's clear than onLoadMore
     * won't fetch any new news entries
     */
    noMoreUpdates: PropTypes.bool,
    /**
     * The actual news entries. See API docs for details
     */
    updatesData: PropTypes.arrayOf(PropTypes.shape({
        data: PropTypes.object,
        course: PropTypes.object
    })),
    /**
     * True is async loading of more entries on demand
     * is running atm
     */
    loadingMore: PropTypes.bool,
    /**
     * True if new news with new filters is being loaded.
     * In this case don't display previous data
     */
    loadingNew: PropTypes.bool
}
export default DashboardNews;