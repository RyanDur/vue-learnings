const testApplication = ({
  app = () => {
    console.log('no router');
  },
  router = () => {
    console.error('no app');
  }
}) => {
  const createAppElement = () => {
    const testApp = document.createElement('div');
    testApp.id = 'app';
    document.body.appendChild(testApp);
  };

  const tearDownIfNecessary = () => {
    if (window.test_instance) {
      window.test_instance.$destroy();
      window.test_instance.$el.remove();
    }
  };

  return {
    render: ({path = '/', ...rest}) => {
      tearDownIfNecessary();
      createAppElement();

      router(path);
      window.test_instance = app(rest);
    }
  }
};

module.exports = testApplication;