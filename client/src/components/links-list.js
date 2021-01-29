import React from "react";
import { Link , useHistory} from "react-router-dom";

export const LinksList = ({ links }) => {
    const history = useHistory();
  if (!links.length) {
    return <p className="center">isEmpty</p>;
  }
  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Short</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td><Link to={()=>{}} onClick={() => {history.push(`/userlist/${link._id}`)}}>Open</Link></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinksList;
