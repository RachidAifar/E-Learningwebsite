


const Logout =() =>{
    localStorage.removeItem('teacherLoginStatus');//the redirect the loged in user to dashboar
    localStorage.removeItem('teacher_id');
    window.location.href='/teacher_login';
    return(
        <div>
            
        </div>
    );
}
export default Logout;