






const Logout =() =>{
    localStorage.removeItem('studentLoginStatus');//the redirect the loged in user to dashboar
    localStorage.removeItem('student_id');
    window.location.href='/students_login';
    return(
        <div>
            
        </div>
    );
}
export default Logout;