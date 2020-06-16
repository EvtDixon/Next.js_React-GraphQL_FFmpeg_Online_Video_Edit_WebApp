# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   tapioca sync

# typed: true

module Parallel
  extend(::Parallel::ProcessorCount)

  def self.all?(*args, &block); end
  def self.any?(*args, &block); end
  def self.each(array, options = _, &block); end
  def self.each_with_index(array, options = _, &block); end
  def self.flat_map(*args, &block); end
  def self.in_processes(options = _, &block); end
  def self.in_threads(options = _); end
  def self.map(source, options = _, &block); end
  def self.map_with_index(array, options = _, &block); end
  def self.worker_number; end
  def self.worker_number=(worker_num); end
end

class Parallel::Break < ::StandardError
end

class Parallel::DeadWorker < ::StandardError
end

class Parallel::ExceptionWrapper
  def initialize(exception); end

  def exception; end
end

class Parallel::JobFactory
  def initialize(source, mutex); end

  def next; end
  def pack(item, index); end
  def size; end
  def unpack(data); end

  private

  def producer?; end
  def queue_wrapper(array); end
end

class Parallel::Kill < ::StandardError
end

module Parallel::ProcessorCount
  def physical_processor_count; end
  def processor_count; end
end

Parallel::Stop = T.let(T.unsafe(nil), Object)

class Parallel::UndumpableException < ::StandardError
  def initialize(original); end

  def backtrace; end
end

class Parallel::UserInterruptHandler
  def self.kill(thing); end
  def self.kill_on_ctrl_c(pids, options); end
end

Parallel::UserInterruptHandler::INTERRUPT_SIGNAL = T.let(T.unsafe(nil), Symbol)

Parallel::VERSION = T.let(T.unsafe(nil), String)

Parallel::Version = T.let(T.unsafe(nil), String)

class Parallel::Worker
  def initialize(read, write, pid); end

  def close_pipes; end
  def pid; end
  def read; end
  def stop; end
  def thread; end
  def thread=(_); end
  def work(data); end
  def write; end

  private

  def wait; end
end
