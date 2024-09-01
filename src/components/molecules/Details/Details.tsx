import React, { useState } from "react";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";

interface DetailsProps {
  selectedStep: number;
  setData: (data: FormData) => void;
  setSelectedStep: (step: number) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  profileName: string;
  socialAccount: string;
  phoneNumber: string;
}

const Details: React.FC<DetailsProps> = ({ setData, setSelectedStep }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [socialAccount, setSocialAccount] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    
    const data: FormData = {
      firstName,
      lastName,
      profileName,
      socialAccount,
      phoneNumber,
    };
    setData(data);
    setSelectedStep(1);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleNext} className="flex flex-col gap-5 w-full">
        <div className="flex gap-[10px] justify-between">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="profileName">Your Profile Name</Label>
          <div className="flex items-center border rounded-md">
            <p className="border-r px-2 text-sm">deltafactor.in/</p>
            <Input
              id="profileName"
              className="border-0"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="socialAccount">Connect your Social Account</Label>
          <div className="flex items-center border rounded-md">
            <p className="border-r px-2 text-sm">https://</p>
            <Input
              id="socialAccount"
              className="border-0"
              value={socialAccount}
              onChange={(e) => setSocialAccount(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phoneNumber">Your Mobile Number</Label>
          <div className="flex items-center border rounded-md">
            <p className="border-r px-2 text-sm font-thin">+91</p>
            <Input
              id="phoneNumber"
              className="border-0"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="text-[10px]">
          You'll receive WhatsApp updates on this number; it is crucial for further communications.
        </p>
        <Button type="submit">Next</Button>
      </form>
      <p className="absolute bottom-8 font-thin text-[16px]">
        ©2024 ALL RIGHTS RESERVED DELTA FACTOR PVT LTD
      </p>
    </div>
  );
};

export default Details;
