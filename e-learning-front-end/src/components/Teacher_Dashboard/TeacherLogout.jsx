


const Logout =() =>{
    localStorage.removeItem('teacherLoginStatus');//the redirect the loged in user to dashboard 
    window.location.href='/teacher_login';
    return(
        <div>
            
        </div>
    );
}
export default Logout;