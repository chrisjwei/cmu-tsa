module Refinery
  module Officers
    class Officer < Refinery::Core::BaseModel
    	attr_accessible :name, :position, :position_name, :major, :blurb, :graduating_year, :active, :photo_id
      self.table_name = 'refinery_officers'      
    
      acts_as_indexed :fields => [:name, :position, :major, :blurb]

      validates :name, :presence => true
      validates_presence_of :name, :position, :major, :blurb
      validates_numericality_of :graduating_year, :greater_than_or_equal => Time.now.year

      belongs_to :photo, :class_name => '::Refinery::Image'
      
      def self.list
      	return ['President', 'Vice President', 'Secretary', 'Treasurer', 'PR Head', 'Service Chair', 'Culture Chair', 'IM Coordinator', 'Graphics Chair', 'Historian', 'Webmaster', 'ITASA Representative']
      end

    end
  end
end
