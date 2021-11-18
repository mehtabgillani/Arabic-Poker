import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Tooltip,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import {
  getUsersList,
  changeUserActivePage,
  deleteUser,
} from "../../store/User/actions";
import Delete from "../../assets/icons/delete.svg";
import DeleteModal from "./components/modal";
import moment from "moment";
function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.Users);
  const [tooltipOpenObj, setTooltipOpenObj] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState("");
  const toggleForToolObj1 = (id) => {
    setTooltipOpenObj({
      ...tooltipOpenObj,
      [id]: tooltipOpenObj[id] ? !tooltipOpenObj[id] : true,
    });
  };
  useEffect(() => {
    dispatch(getUsersList({ page: users.userActivePage }));
  }, [users.userActivePage]);

  return (
    <React.Fragment>
      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col sm="6">
              <h4
                className="page-title mb-3"
                onClick={() => {
                  console.log(
                    "this is my user list which i had to show",
                    users.usersList
                  );
                }}
              >
                Users
              </h4>
            </Col>
          </Row>
        </div>
        <DeleteModal
          page={users.userActivePage}
          actionFunction={deleteUser}
          id={userId}
          modal={deleteModal}
          setModal={setDeleteModal}
          color="danger"
          title="Delete User!"
          default
          message="Are you sure you want to delete this user? "
        />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <>
                  <Table
                    responsive
                    striped 
                    bordered 
                    hover 
                    size="md"
                    className="fixed"
                    style={{
                      overflow: "hidden",
                      tableLayout: "fixed",
                      textAlign: "center",
                    }}
                  >
                    <thead className="">
                      <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>Birthday</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.usersList.data &&
                        users.usersList.data.users &&
                        users.usersList.data.users &&
                        users.usersList.data.users.map((user, id) => (
                          <tr>
                            <td>{user.username}</td>
                            {user.email && user.email.length > 23 ? (
                              <td>{user.email.substring(0, 23)}....</td>
                            ) : (
                              <td>{user.email}</td>
                            )}

                            <td>{user.age}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                              {moment(user.birthDate).format("MMM Do YYYY")}
                            </td>
                            <td>
                              <span
                                id={`delete_${id}`}
                                style={{ marginRight: "5px" }}
                                onClick={() => {
                                  setDeleteModal(true);
                                  setUserId(user.id);
                                }}
                              >
                                <img style={{ height: "22px" }} src={Delete} />
                              </span>

                              <Tooltip
                                placement="top"
                                isOpen={
                                  tooltipOpenObj[`delete_${id}`] ? true : false
                                }
                                target={`delete_${id}`}
                                toggle={() => toggleForToolObj1(`delete_${id}`)}
                              >
                                Delete User
                              </Tooltip>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Row className="justify-content-center mt-3">
                    <Col lg="3">
                      <div className="table_pagination">
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={users.userActivePage}
                          itemsCountPerPage={8}
                          totalItemsCount={
                            users.usersList.totalPages
                              ? users.usersList.totalPages * 8
                              : 8
                          }
                          pageRangeDisplayed={5}
                          onChange={(pageNumber) => {
                            dispatch(changeUserActivePage(pageNumber));
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default UserList;
