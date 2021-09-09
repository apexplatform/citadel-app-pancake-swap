import text from '../text.json'
const AlarmBlock = () => {
    return(
        <div className='alarm-block'>
            <img src='/img/icons/alarm.svg' alt='alarm' />
            <p>{text.ALARM_TEXT}</p>
        </div>
    )
}
export default AlarmBlock