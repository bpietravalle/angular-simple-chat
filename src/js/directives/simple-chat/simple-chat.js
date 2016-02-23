angular
    .module('angular-simple-chat.directives')
    .directive('simpleChat', simpleChat);

/* @ngInject */
function simpleChat($timeout) {
    var directive = {
        bindToController: true,
        controller: 'simpleChatController',
        controllerAs: 'sc',
        link: link,
        restrict: 'AE',
        templateUrl: 'directives/simple-chat/simple-chat.html',
        scope: {
            messages: '=',
            localUser: '=',
            toUser: '=',
            sendFunction: '=',
            showUserAvatar: '=',
            showComposer: '=',
            sendButtonText: '@',
            composerPlaceholderText: '@'
        }
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
        var $simpleChatContainer = angular.element(element.children()[0])[0],
            scrollToBottom = function() {
                $simpleChatContainer.scrollTop = $simpleChatContainer.scrollHeight;
            };

        scope.$on('simple-chat-message-posted', function() {
            $timeout(scrollToBottom, 0);
        });

        scope.$watchCollection(function() {
            return scope.sc.messages;
        }, function(newVal, oldVal) {
            $timeout(scrollToBottom, 0);
        });

        if (angular.isDefined(ctrl.messages) && ctrl.messages.length > 0) {
            $timeout(scrollToBottom, 0);
        }

        if (angular.isUndefined(ctrl.messages)) {
            ctrl.messages = [];
        }
    }
}

angular
    .module('angular-simple-chat.directives')
    .controller('simpleChatController', simpleChatController);

/* @ngInject */
function simpleChatController() {
    this.options = new SimpleChatConfig();

    if (angular.isDefined(this.showUserAvatar)) {
        this.options.setShowUserAvatar(this.showUserAvatar);
    }
    if (angular.isDefined(this.showComposer)) {
        this.options.setShowComposer(this.showComposer);
    }
}
