//app component
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
function constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phonenumber: '',
        gender: '',
        roleId: '',
        positionId: '',

        genderArr: [],
        positionArr: [],
        userArr: [],
        previewImgURL: '',
        isOpen: false,

    }
}
function componentDidMount() { // Nhớ thêm async đầu hàm
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getAllUsersStart('ALL')
}
function componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
        this.setState({
            genderArr: this.props.genderRedux
        })
    }
    if (prevProps.isLoadingGenderRedux !== this.props.isLoadingGenderRedux) {
        this.setState({
            isLoading: this.props.isLoadingGenderRedux
        })
    }
    if (prevProps.listUserRedux !== this.props.listUserRedux) {
        this.setState({
            userArr: this.props.listUserRedux
        })
    }
}
function createNewUser() {
    this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId
    }); // TẠM THỜI NHƯ THẾ
    setTimeout(() => {
        this.props.getAllUsersStart('ALL')
    }, 1000)
}
function render() {
    let genders = this.props.genderRedux;
    let positions = this.props.positionRedux;
    let isLoadingGender = this.props.isLoadingGenderRedux;
    let listUsers = this.props.listUserRedux;
    console.log('genders redux side: ', genders)
    return (
        <React.Fragment>
            <div onClick={() => this.createNewUser()}>CREATE USER</div>
            <div className='table-user-redux'>
                {userArr && userArr.length > 0} ...
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        listUserRedux: state.admin.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUserStart: (user) => dispatch(actions.createUserStart(user)),
        getAllUsersStart: (type) => dispatch(actions.fetchAllUserStart(type))
    }
}
// export default connect(mapStateToProps, mapDispatchToProps)(appComponent);
// actionType.js
const actionTypes = Object.freeze({
    // admin
    // => Đúng chuẩn thì phải có 3 bộ: Start Doing End
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',
    // => Hiểu rồi thì rút gọn còn 2 bộ: Start End
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',
    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED'
})

// index.js trong actions 
export * from './adminActions' // Export toàn bộ action của Admin 

// adminAction.js
import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers } from '../../services/userService';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("GENDER");
            if (response && response.status === 'OK') {
                console.log('hoidanit check getState: ', getState);
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error: ', error)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('POSITION');
            if (response && response.status === 'OK') {
                return {
                    type: actionTypes.FETCH_POSITION_SUCCESS,
                    data: response.data
                }
            } else {
                dispatch(fetchPositionEnd())
            }
        } catch (error) {
            dispatch(fetchPositionEnd())
        }
    }
}
export const fetchPositionEnd = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const createUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            const response = await createNewUserService(user);
            if (response && response.status === 'OK') {
                dispatch(createUserSuccess(response.data))
                dispatch(fetchAllUserStart())
            } else {
                dispatch(createUserFailed())
            }
        } catch (error) {
            dispatch(createUserFailed())
        }
    }
}
export const createUserSuccess = (dataUser) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: dataUser
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            const response = await getAllUsers('ALL');
            if (response && response.status === 'OK') {
                dispatch(fetchAllUserSuccess(response.data))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
        }
    }
}
export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: users
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})
// adminReducer.js
// import actionTypes from './actionTypes'
const initialState = {
    users: [],
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false
}
const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyStateStart = { ...state };
            copyStateStart.isLoadingGender = false;
            return {
                ...copyStateStart
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyStateSuccess = { ...state };
            copyStateSuccess.genders = action.data;
            copyStateSuccess.isLoadingGender = false
            return {
                ...copyStateSuccess
            }
        case actionTypes.FETCH_GENDER_FAILED:
            let copyStateFailed = { ...state };
            copyStateFailed.isLoadingGender = false;
            copyStateFailed.genders = [];
            return {
                ...copyStateFailed
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            let copyStateFetchAllUsers = { ...state };
            copyStateFetchAllUsers.users = action.data;
            return {
                ...copyStateFetchAllUsers
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        default:
            return state
    }
}
export default adminReducer

function handleOnchangeImage(event) {
    let data = event.target.files;
    let file = data[ 0 ];
    if (file) {
        let objectUrl = URL.createObjectURL(file);
        this.setState({
            previewImgURL: objectUrl
        })
    }
}
function openPreviewImage() {
    if (!this.state.previewImgURL) return;
    this.setState({
        isOpen: true
    })
}
//INPUT FILE IMAGE WITH INPUT HTML
(
    <div>
        <input id='previewImg' type='file' onChange={(e) => this.handleOnchangeImage(e)} />
        <label htmlFor='previewImg'>
            Tải ảnh&nbsp;
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </label>
        <div className='preview-image'
            style={{ backgroundImage: `url(${ this.state.previewImgURL })` }}
            onClick={() => this.openPreviewImage()}
        >

        </div>
        {/* Nên để ở ngoài cho toàn màn hình */}
        {/* react-image-lightbox */}
        <LightBox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
        />
    </div>
)