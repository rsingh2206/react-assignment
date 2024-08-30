import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { containsAlphabetsNumbersAndSpecialChars } from '../utilites';

export const Signup = () => {
    const ALPHA_NUM_CHAR_REGEX = /^[a-zA-Z0-9!@#$%&()*\\-`.+,/\"]*$/;
    const navigate = useNavigate();

    // const formRef=useRef({});
    const [name, setName] = useState('');
    const [nameFocus, setNameFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordFocus, setNewPasswordFocus] = useState(false);

    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmNewPasswordFocus, setConfirmNewPasswordFocus] = useState(false);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const confirmNewPassError = (((newPassword && confirmNewPassword) && (newPassword !== confirmNewPassword)) ? true : false);

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);

    const handleKeyDown = (event) => {
        if (!ALPHA_NUM_CHAR_REGEX.test(event.key)) event.preventDefault();
    }

    const checkUsername = containsAlphabetsNumbersAndSpecialChars(username);
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(true);
    const [checkEmail, setCheckEmail] = useState(true);
    const [newPasswordError, setNewPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let isErrorOccured = false;

        if (!checkUsername) isErrorOccured = true;

        if (!email.includes('@' && '.com')) {
            isErrorOccured = true;
            setCheckEmail(false);
        } else setCheckEmail(true);

        if (!(phoneNumber.length > 9)) {
            isErrorOccured = true;
            setCheckPhoneNumber(false);
        } else setCheckPhoneNumber(true);

        const checkNewPassword = containsAlphabetsNumbersAndSpecialChars(newPassword);
        if (!checkNewPassword || username === newPassword) {
            isErrorOccured = true;
            if (username === newPassword && !checkNewPassword) {
                setNewPasswordError(`USERNAME and PASSWORD should not be same, PASSWORD must contain combination of alphanumeric values with special characters only`)
            } else if (username === newPassword) {
                setNewPasswordError(`USERNAME and PASSWORD should not be same`);
            } else setNewPasswordError(`PASSWORD must contain combination of alphanumeric values with special characters only`);
        } else setNewPasswordError('');

        if (isErrorOccured) return;

        alert('You have signed up, Redirecting to Login Thanks!');
        return navigate('/login');
    }

    return (
        <div>
            <Navbar headtext={'Create new Account'} />
            <form autoComplete='off' className='mt-[7vh] w-[70vw] mx-auto' onSubmit={handleSubmit}>
                <div className='mb-[6vh] flex justify-between flex-col lg:flex-row gap-10'>
                    <div className='relative flex flex-col w-full lg:w-1/2 justify-center align-center gap-y-2'>
                        <label htmlFor="nameLable" className={`absolute top-[-25%] w-fit text-xs text-[#0a856d] pl-4 ${nameFocus || name.length > 0 ? 'block' : 'hidden'}`}>NAME</label>
                        <input
                            type='text'
                            required
                            name='name'
                            value={name}
                            placeholder={nameFocus ? '' : 'NAME'}
                            className={`w-full border-b-[1px] ${nameFocus ? 'border-[#0a856d]' : 'border-gray-500'} pl-4 focus:outline-none`}
                            onChange={e => setName(e.target.value)}
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p className={`${true? 'visible' : 'invisible'} h-10`}/>
                    </div>
                    <div className='relative flex flex-col w-full lg:w-1/2 justify-center align-center gap-y-2'>
                        <label htmlFor="usernameLable" className={`absolute top-[-25%] w-fit text-xs ${!checkUsername && username.length > 0 ? 'text-error-color' : 'text-[#0a856d]'} pl-4 ${usernameFocus || username.length > 0 ? 'block' : 'hidden'}`}>USERNAME</label>
                        <input
                            type='text'
                            required
                            name='username'
                            value={username}
                            placeholder={usernameFocus ? '' : 'USERNAME'}
                            onKeyDown={handleKeyDown}
                            className={`w-full border-b-[1px] ${usernameFocus ? 'border-[#0a856d]' : 'border-gray-500'} pl-4 focus:outline-none`}
                            onChange={e => setUsername(e.target.value)}
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p className={`text-red text-left text-error-color text-sm pl-4 ${!checkUsername && username.length > 0 ? 'visible' : 'invisible'} h-10`}>USERNAME must contain combination of alphanumeric values with special characters only</p>
                    </div>
                </div>
                <div className='mb-[6vh] flex justify-between flex-col lg:flex-row gap-10'>
                    <div className='relative flex flex-col w-full lg:w-1/2 justify-center align-center gap-y-2'>
                        <label htmlFor="emailLable" className={`absolute top-[-25%] w-fit text-xs ${!checkEmail ? 'text-error-color' : 'text-[#0a856d]'} pl-4 ${emailFocus || email.length > 0 ? 'block' : 'hidden'}`}>EMAIL</label>
                        <input
                            type='text'
                            required
                            name='email'
                            value={email}
                            placeholder={emailFocus ? '' : 'EMAIL'}
                            onKeyDown={handleKeyDown}
                            className={`w-full border-b-[1px] ${emailFocus ? 'border-[#0a856d]' : 'border-gray-500'} pl-4 focus:outline-none`}
                            onChange={e => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p className={`text-red text-left text-error-color text-sm pl-4 ${!checkEmail ? 'visible' : 'invisible'} h-10`}>Your EMAIL is invalid</p>
                    </div>
                    <div className='relative flex flex-col w-full lg:w-1/2 justify-center align-center gap-y-2'>
                        <label htmlFor="phoneNumberLable" className={`absolute top-[-25%] w-fit text-xs ${!checkPhoneNumber ? 'text-error-color' : 'text-[#0a856d]'} pl-4 ${phoneNumberFocus || phoneNumber.length > 0 ? 'block' : 'hidden'}`}>PHONE NO.</label>
                        <div className={'flex items-center'}>
                            <span className={`${phoneNumberFocus || phoneNumber.length > 0 ? 'block' : 'hidden'}`}>+91</span>
                            <input
                                type='number'
                                required
                                name='phone Number'
                                value={phoneNumber}
                                placeholder={phoneNumberFocus ? '' : 'PHONE NO.'}
                                onKeyDown={handleKeyDown}
                                className={`w-full border-b-[1px] ${phoneNumberFocus ? 'border-[#0a856d]' : 'border-gray-500'} pl-4 focus:outline-none`}
                                onChange={e => setPhoneNumber(e.target.value)}
                                onFocus={() => setPhoneNumberFocus(true)}
                                onBlur={() => setPhoneNumberFocus(false)}
                            />
                        </div>
                        <p className={`text-red text-left text-error-color text-sm pl-4 ${!checkPhoneNumber ? 'visible' : 'invisible'} h-10`}>Your PHONE NO. is invalid, it must greater than 9 numbers</p>
                    </div>
                </div>
                <div className='mb-[6vh] flex justify-between flex-col lg:flex-row gap-10'>
                    <div className='relative flex flex-col w-full lg:w-1/2 justify-center align-center'>
                        <label htmlFor="newPasswordLable" className={`absolute top-[-25%] w-fit text-xs ${newPasswordError ? 'text-error-color' : 'text-[#0a856d]'} pl-4 ${newPasswordFocus || newPassword.length > 0 ? 'block' : 'hidden'}`}>PASSWORD</label>
                        <div className='flex items-center' onFocus={() => setNewPasswordFocus(true)} onBlur={() => setNewPasswordFocus(false)}>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                required
                                name='newPassword'
                                value={newPassword}
                                placeholder={newPasswordFocus ? '' : 'PASSWORD'}
                                onKeyDown={handleKeyDown}
                                className={`w-full border-b-[1px] ${newPasswordFocus ? 'border-[#0a856d]' : 'border-gray-500'} pl-4 focus:outline-none`}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <button type='button' onClick={handleClickShowNewPassword} className='ml-[-7%] text-gray-400'>
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                        </div>
                        <p className={`text-red text-left text-error-color text-sm pl-4 ${newPasswordError ? 'visible' : 'invisible'} h-10`}>{newPasswordError}</p>
                    </div>
                    <div className='relative flex flex-col w-full lg:w-1/2 justify-center align-center'>
                        <label htmlFor="confirmPasswordLable" className={`absolute top-[-25%] w-fit text-xs ${confirmNewPassError ? 'text-error-color' : 'text-[#0a856d]'} pl-4 ${confirmNewPasswordFocus || confirmNewPassword.length > 0 ? 'block' : 'hidden'}`}>CONFIRM NEW PASSWORD</label>
                        <div className='flex items-center' onFocus={() => setConfirmNewPasswordFocus(true)} onBlur={() => setConfirmNewPasswordFocus(false)}>
                            <input
                                type={showConfirmNewPassword ? 'text' : 'password'}
                                required
                                name='confirmNewPassword'
                                value={confirmNewPassword}
                                placeholder={confirmNewPasswordFocus ? '' : 'CONFIRM NEW PASSWORD'}
                                onKeyDown={handleKeyDown}
                                className={`w-full border-b-[1px] ${confirmNewPasswordFocus ? 'border-[#0a856d]' : 'border-gray-500'} pl-4 focus:outline-none`}
                                onChange={e => setConfirmNewPassword(e.target.value)}
                            />
                            <button type='button' onClick={handleClickShowConfirmNewPassword} className='ml-[-7%] text-gray-400'>
                                {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                        </div>
                        <p className={`text-red text-left text-error-color text-sm pl-4 ${confirmNewPassError ? 'visible' : 'invisible'} h-10`}>CONFIRM PASSWORD must be same as PASSWORD</p>
                    </div>
                </div>
                <button type='submit' className='bg-[#0a856d] text-white h-10 w-56 py-2 rounded-lg float-right'>SIGN UP</button>
            </form>
        </div>
    )
}