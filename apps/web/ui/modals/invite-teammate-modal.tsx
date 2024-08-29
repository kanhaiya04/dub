import useWorkspace from "@/lib/swr/use-workspace";
import { BlurImage, Logo, Modal, useMediaQuery } from "@dub/ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { InviteTeammatesForm } from "../workspaces/invite-teammates-form";

function InviteTeammateModal({
  showInviteTeammateModal,
  setShowInviteTeammateModal,
}: {
  showInviteTeammateModal: boolean;
  setShowInviteTeammateModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const { id, slug, logo } = useWorkspace();
  const { isMobile } = useMediaQuery();

  return (
    <Modal
      showModal={showInviteTeammateModal}
      setShowModal={setShowInviteTeammateModal}
    >
      <div className="scrollbar-hide h-fit max-h-[95dvh] overflow-y-auto">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
          {logo ? (
            <BlurImage
              src={logo}
              alt={"Invite Teammates"}
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          ) : (
            <Logo />
          )}
          <h3 className="text-lg font-medium">Invite Teammates</h3>
          <p className="text-center text-sm text-gray-500">
            Invite teammates to join your workspace. Invitations will be valid
            for 14 days.
          </p>
        </div>
        <InviteTeammatesForm
          onSuccess={() => setShowInviteTeammateModal(false)}
          className="bg-gray-50 px-4 py-8 sm:px-16"
        />
      </div>
    </Modal>
  );
}

export function useInviteTeammateModal() {
  const [showInviteTeammateModal, setShowInviteTeammateModal] = useState(false);

  const InviteTeammateModalCallback = useCallback(() => {
    return (
      <InviteTeammateModal
        showInviteTeammateModal={showInviteTeammateModal}
        setShowInviteTeammateModal={setShowInviteTeammateModal}
      />
    );
  }, [showInviteTeammateModal, setShowInviteTeammateModal]);

  return useMemo(
    () => ({
      setShowInviteTeammateModal,
      InviteTeammateModal: InviteTeammateModalCallback,
    }),
    [setShowInviteTeammateModal, InviteTeammateModalCallback],
  );
}
