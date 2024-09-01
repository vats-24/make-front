import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "../atoms/ui/button";
import { Label } from "../atoms/ui/label";
import { Input } from "../atoms/ui/input";
import TopicsProfile from "../molecules/TopicsProfile";
import WeekdayTimePickerProfile from "../molecules/Availability/TimePickerProfile";
import { toast } from "react-hot-toast";
import useGetprofileDetails from "@/queries/profile/use-get-profile";
import { useGetSignedUrl, useUpdateProfile, useUploadToS3 } from "@/queries/profile/use-update-profile";
import { queryClient } from "@/react-query/client";
import noProfile from "@assets/no-profile-picture.svg"
import { SkeletonCard } from "../molecules/SkeltonCard";
import { profileSchema } from "@/validation/profile";

interface ProfileData {
  firstName: string;
  lastName: string;
  profileName: string;
  socialAccount: string;
  phoneNumber: string;
  profilePhoto: string;
  upiId: string;
  expertise: string[];
  availability: [];
}

const defaultProfileData: ProfileData = {
  firstName: "",
  lastName: "",
  profileName: "",
  socialAccount: "",
  phoneNumber: "",
  profilePhoto: "",
  upiId: "",
  expertise: [],
  availability: []
};

interface SignedUrlResponse {
  signedUrl: string;
  key: string;
}


const Profile: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>(defaultProfileData);
  const [topics, setTopics] = useState<string[]>(defaultProfileData.expertise);
  const [availability, setAvailability] = useState<any>(defaultProfileData.availability);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const updateProfileMutation = useUpdateProfile();
  const getSignedUrlMutation = useGetSignedUrl();
  const uploadToS3Mutation = useUploadToS3();

  const { data: profileData, isLoading, isError } = useGetprofileDetails();

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      setTopics(profileData.expertise || []);
      setAvailability(profileData.availability || []);
    }

    setProfile((prevProfile) => ({
      ...prevProfile,
      expertise: topics,
      availability: availability,
    }));
  }, [profileData]);

  const handleProfileChange = async () => {
    try {

      const updatedProfile: ProfileData = {
        ...profile,
        expertise: topics,
        availability: availability,
      };

      const validationResult = profileSchema.safeParse(updatedProfile);
      if (!validationResult.success) {
        toast.error(`Validation failed: ${validationResult.error.errors[0]?.message}`);
        return;
      }

      if (selectedFile) {
        try {
          const response = await getSignedUrlMutation.mutateAsync(selectedFile.type as string);
          const { signedUrl, key } = response as unknown as SignedUrlResponse;
          await uploadToS3Mutation.mutateAsync({ signedUrl, file: selectedFile });
          setProfile((prevProfile) => ({ ...prevProfile, profilePhoto: key }));
        } catch (error) {
          toast.error("Error uploading image");
          return;
        }
      }

      updateProfileMutation.mutate(updatedProfile, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile-details"] });
          setEdit(false);
        },
      });
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputCick = () => {
    console.log("emdit")
    if(!edit) {
      toast.error("Edit mode disabled")
    }
  }

  if (isLoading) return <div><SkeletonCard/></div>;
  if (isError) return <div>Error loading profile data</div>;

  return (
    <div className="h-full flex flex-col p-8 gap-8 bg-[#F7F6F9]">
      <div className="flex items-center justify-between p-1 relative">
        <h1 className="text-4xl font-semibold">Your Profile</h1>
        {!edit ? (
          <Button
            className="bg-[#6425FE]"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        ) : (
          <Button className="bg-[#6425FE]" onClick={handleProfileChange}>
            Save Changes
          </Button>
        )}
      </div>
      <div>
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 rounded-full mr-2 border"
          />
        ) : (
          <img
            src={noProfile || `https://s3-bucket-url/${profile.profilePhoto}`}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-2 border"
          />
        )}
        <input
          type="file"
          id="files"
          className="hidden"
          onChange={handleFileChange}
          disabled={!edit}
        />
        <label
          htmlFor="files"
          className="pointer text-[#6425FE] text-[14px] font-medium"
        >
          Upload Photo
        </label>
      </div>
      <div className="flex flex-col w-[40%] gap-10">
        <div className="flex flex-col bg-white p-3 rounded-2xl z-10 gap-5">
          <div className="flex gap-[10px]">
            <div>
              <Label>First Name</Label>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div onClick={handleInputCick}>
              <Input
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                disabled={!edit}
              />
              </div>
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                disabled={!edit}
              />
            </div>
          </div>
          <div>
            <Label>Your Profile Name</Label>
            <div className="flex items-center border rounded-md">
              <p className="border-r px-2 text-sm">deltafactor.in/</p>
              <Input
                className="border-0"
                value={profile.profileName}
                onChange={(e) =>
                  setProfile({ ...profile, profileName: e.target.value })
                }
                disabled={!edit}
              />
            </div>
          </div>
          <div>
            <Label>Connect your Social Account</Label>
            <div className="flex items-center border rounded-md">
              <p className="border-r px-2 text-sm">https://</p>
              <Input
                className="border-0"
                value={profile.socialAccount}
                onChange={(e) =>
                  setProfile({ ...profile, socialAccount: e.target.value })
                }
                disabled={!edit}
              />
            </div>
          </div>
          <div>
            <Label>Your Mobile Number</Label>
            <div className="flex items-center border rounded-md">
              <p className="border-r px-2 text-sm font-thin">+91</p>
              <Input
                className="border-0"
                value={profile.phoneNumber}
                onChange={(e) =>
                  setProfile({ ...profile, phoneNumber: e.target.value })
                }
                disabled={!edit}
              />
            </div>
            <p className="text-[10px]">
              You'll receive WhatsApp updates on this number. It is very crucial
              for further communications.
            </p>
          </div>
        </div>
        <div className="flex flex-col h-26 bg-white rounded-2xl p-3 gap-4">
          <h3>Payment Details for Payout</h3>
          <div>
            <Label>UPI ID</Label>
            <Input
              value={profile.upiId}
              onChange={(e) =>
                setProfile({ ...profile, upiId: e.target.value })
              }
              disabled={!edit}
            />
          </div>
        </div>
        <div className="flex flex-col h-26 bg-white rounded-2xl p-3 gap-4">
          <h3>Additional Details</h3>
          <TopicsProfile
            topics={topics}
            setData={setTopics}
            edit={edit}
          />
        </div>
        <div>
          <WeekdayTimePickerProfile
            data={availability}
            setData={setAvailability}
            edit={edit}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
