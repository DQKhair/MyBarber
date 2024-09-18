using MyBarBer.Data;
using MyBarBer.Helper;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class AdministratorDTO
    {
        public static Administrator AdministratorVMToAdministrator(AdministratorVM administratorVM, Administrator administrator)
        {
            try
            {
                if(administratorVM != null && administrator != null)
                {
                    administrator.AdminName = administratorVM.AdminName;
                    administrator.AdminPhone = administratorVM.AdminPhone;
                    administrator.AdminAddress = administratorVM.AdminAddress;
                    administrator.AdminPassword = HashPassword.ConvertPasswordToHash(administratorVM.AdminPassword);

                    return administrator;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static AdministratorVM AdministratorToAdministratorVM(Administrator administrator)
        {
            try
            {
                if(administrator != null)
                {
                    var _administratorVM = new AdministratorVM
                    {
                        Admin_ID = administrator.Admin_ID,
                        AdminName = administrator.AdminName,
                        AdminPhone = administrator.AdminPhone,
                        AdminAddress = administrator.AdminAddress,
                        AdminEmail = administrator.AdminEmail,
                        AdminPassword = administrator.AdminPassword,
                        Role_ID = administrator.Role_ID
                    };

                    return _administratorVM;
                }    
                return null!;
            }
            catch
            {
                return null!;
            }
        }
    }
}
