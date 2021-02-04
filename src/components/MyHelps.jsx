import React from "react";
import helpService from "../services/help-service";
import { Link, NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import moment from 'moment';
import Helmet from 'react-helmet';

class MyHelps extends React.Component {
  state = {
    helps: null,
    loading: true,
    reopenHours: 48
  };

  async componentDidMount() {
    const helps = await helpService.myHelps();
    this.setState({helps, loading: false})
  }

  handleReopen = async (help) => {
    const diff = moment().diff(moment(help.updated_at), 'hours');
    if (diff < this.state.reopenHours) {
      alert('Please try again in ' + (this.state.reopenHours - diff) + ' hours')
    } else {
      const response = await helpService.reopen(help.id);
      if (response.status === 201) {
        this.props.history.push(`/help/${help.id}`)
      } else {
        alert('Please try again')
      }
    }
  }

  render() {
    const { helps, loading } = this.state;
    return (
      <div className="container-fluid py-3">
        <Helmet>
          <title>My Help Requests</title>
          <style>{`
            .meta {
              font-size: 12px;
            }
            .card-text {
              font-size: 14px !important;
              color: #666;
  
            }
            .label.category {
              padding: 2px 8px;
              color: white; 
              border-radius: 7px; 
              font-weight: bold
            }
          `}</style>
        </Helmet>
        <div className="row">
          <div className="col-md-12">
            { loading ? 
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div className="col-md-4" key={num}>
                  <div className="card mb-3">
                    <div className="card-header text-start">
                      <Skeleton width="80%" height={20} />
                    </div>
                    <div className="card body text-center">
                      <div className="mb-2">
                      <div className="row mb-2">
                        <div className="col-6"><Skeleton width="60%" height={20} /></div>
                        <div className="col-6"><Skeleton width="60%" height={20} /></div>
                      </div>
                      </div>
                      <Skeleton width="95%" height={10} />
                      <Skeleton width="95%" height={10} />
                    </div>
                    <div className="card footer text-end">
                      <Skeleton width="60%" height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            : (helps && helps.length) ? <div className="row">
            {helps.map(help => (
              <div className="col-md-4 mb-3 px-2" key={help.id}>
                <div className="card">
                  <div className="card-header text-start">
                    {help.title}
                  </div>
                  <div className="card body mx-2" style={{ border:'none' }}>
                    <div className="row meta my-2">
                        <div className="col-md-6"><span className="label category" style={{ backgroundColor: help.category.color }}>{help.category.name}</span></div>
                        <div className="col-md-6 text-end">Posted <span style={{ fontWeight: 'bold' }}>{moment(help.created_at).fromNow()}</span></div>
                    </div>
                    <p className="card-text text-justify mb-2">{help.description.substring(0, 100)}... 
                      <NavLink as="a" to={`/help/${help.id}`}>View Details</NavLink>
                    </p>
                  </div>
                  <div className="card footer pt-2">
                    <p className="px-2" style={{ fontSize: '12px'}}>Status {help.status ? <span style={{ fontWeight: 'bold', color: 'green'}}>Fulfilled</span> : <span style={{ fontWeight: 'bold', color: 'red'}}>Unfulfilled</span>}
                      &nbsp; {help.status && <button className="btn btn-clear" onClick={() => this.handleReopen(help)}>Click to reopen</button>}
                    </p> 
                  </div>
                </div>
              </div>
            ))}
          </div> :
            <div className="alert alert-info">
              You have not requested any help. Use this
              <Link to="/request-help" as="a">
                link
              </Link>{" "}
              to request
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default MyHelps;
