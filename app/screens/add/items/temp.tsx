
function App(){
    const [showModal, setShowModal] = React.useState(false);
    const ref = React.useRef(null);
    return (
      <Center className='h-[300px]'>
        <Button onPress={() => setShowModal(true)} ref={ref}>
          <ButtonText>Show Modal</ButtonText>
        </Button>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          finalFocusRef={ref}
          size="md" 
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" className="text-typography-950">
                Invite your team
              </Heading>
              <ModalCloseButton >
                <Icon as={CloseIcon} size="md"
          className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text size="sm" className="text-typography-500">
                Elevate user interactions with our versatile modals. Seamlessly
                integrate notifications, forms, and media displays. Make an impact
                effortlessly.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Explore</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    );
  }
