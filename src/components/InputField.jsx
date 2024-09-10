import { handleKeyDown, handlePaste } from '../utils/handleFuncLogic';
import { VisibilityIcon } from './VisibilityIcon';

export const InputField = ({ name, type = 'text', value, labelValue, show, error, handleChange, handleClickShow }) => {
    const isPhoneNum = name === 'phoneNumber';
    return (
        <div className='relative flex flex-col w-full justify-center align-center gap-y-2 m-auto'>
            <input
                type={show === false ? 'password' : type}
                required
                name={name}
                value={value}
                placeholder=''
                onKeyDown={handleKeyDown}
                className={`border-b-[1px] border-gray-500 pl-4 pb-2.5 pt-5 w-full text-gray-900 focus:border-[#0a856d] focus:outline-none peer`}
                onChange={handleChange}
                onPaste={e => isPhoneNum ? handlePaste(e) : ''}
            />
            {((name.toLocaleLowerCase()).includes('password') && value.length > 0) &&
                <button type='button' onClick={() => handleClickShow(name)} className='absolute top-[20%] right-0 text-gray-400'>
                    <VisibilityIcon show={show} />
                </button>
            }
            {isPhoneNum && <span className='absolute top-[20%] left-[-15px] hidden peer-focus:block'>+91</span>}
            <label
                htmlFor={name}
                className={`absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 origin-[0] left-[3.5%] peer-focus:text-sm ${error ? 'peer-focus:text-error-color text-error-color' : 'peer-focus:text-[#0a856d]'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
            >{labelValue}
            </label>
            <p className={`text-red text-left text-error-color text-xs sm:text-sm pl-4 ${error ? 'visible' : 'invisible'} h-10`}>{error}</p>
        </div>
    )
}