import UpdateProfileForm from '@/components/form/UpdateProfile';
import getUser from '@/utils/getUser';

export default async function UpdateProfile() {
  const user = await getUser();

  return (
    <>
      <UpdateProfileForm userInfo={user} />
    </>
  );
}
