module ActiveAdmin
  
  class Resource
    module BatchActions
      
      attr_reader :batch_actions
      
      # @return [Array] The set of batch actions for this resource
      def batch_actions
        @batch_actions ||= []
      end
      
      # Add a new batch item to a resource
      # @param [String] title
      # @param [Hash] options
      #
      #
      def add_batch_action(sym, title, options = {}, &block)
        self.batch_actions << ActiveAdmin::BatchAction.new( sym, title, options, &block )
      end
      
      # Clears all the existing batch actions for this resource
      def clear_batch_actions!
        @batch_actions = []
      end
      
      # Path to the batch action itself
      def batch_action_path
        [:batch_action, namespace.name, plural_underscored_resource_name]
      end
      
    end
  end
  
  class BatchAction

    attr_reader :block, :title, :sym

    def initialize(sym, title, options = {}, &block)
      @sym, @title, @options, @block = sym, title, options, block
    end

  end
  
end