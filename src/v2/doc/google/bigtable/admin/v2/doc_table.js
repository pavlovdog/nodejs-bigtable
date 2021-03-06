// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * A collection of user data indexed by row, column, and timestamp.
 * Each table is served using the resources of its parent cluster.
 *
 * @property {string} name
 *   (`OutputOnly`)
 *   The unique name of the table. Values are of the form
 *   `projects/<project>/instances/<instance>/tables/[_a-zA-Z0-9][-_.a-zA-Z0-9]*`.
 *   Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`
 *
 * @property {Object.<string, Object>} clusterStates
 *   (`OutputOnly`)
 *   Map from cluster ID to per-cluster table state.
 *   If it could not be determined whether or not the table has data in a
 *   particular cluster (for example, if its zone is unavailable), then
 *   there will be an entry for the cluster with UNKNOWN `replication_status`.
 *   Views: `REPLICATION_VIEW`, `FULL`
 *
 * @property {Object.<string, Object>} columnFamilies
 *   (`CreationOnly`)
 *   The column families configured for this table, mapped by column family ID.
 *   Views: `SCHEMA_VIEW`, `FULL`
 *
 * @property {number} granularity
 *   (`CreationOnly`)
 *   The granularity (i.e. `MILLIS`) at which timestamps are stored in
 *   this table. Timestamps not matching the granularity will be rejected.
 *   If unspecified at creation time, the value will be set to `MILLIS`.
 *   Views: `SCHEMA_VIEW`, `FULL`
 *
 *   The number should be among the values of [TimestampGranularity]{@link google.bigtable.admin.v2.TimestampGranularity}
 *
 * @typedef Table
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.Table definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
 */
const Table = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * The state of a table's data in a particular cluster.
   *
   * @property {number} replicationState
   *   (`OutputOnly`)
   *   The state of replication for the table in this cluster.
   *
   *   The number should be among the values of [ReplicationState]{@link google.bigtable.admin.v2.ReplicationState}
   *
   * @typedef ClusterState
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.Table.ClusterState definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
   */
  ClusterState: {
    // This is for documentation. Actual contents will be loaded by gRPC.

    /**
     * Table replication states.
     *
     * @enum {number}
     * @memberof google.bigtable.admin.v2
     */
    ReplicationState: {

      /**
       * The replication state of the table is unknown in this cluster.
       */
      STATE_NOT_KNOWN: 0,

      /**
       * The cluster was recently created, and the table must finish copying
       * over pre-existing data from other clusters before it can begin
       * receiving live replication updates and serving Data API requests.
       */
      INITIALIZING: 1,

      /**
       * The table is temporarily unable to serve Data API requests from this
       * cluster due to planned internal maintenance.
       */
      PLANNED_MAINTENANCE: 2,

      /**
       * The table is temporarily unable to serve Data API requests from this
       * cluster due to unplanned or emergency maintenance.
       */
      UNPLANNED_MAINTENANCE: 3,

      /**
       * The table can serve Data API requests from this cluster. Depending on
       * replication delay, reads may not immediately reflect the state of the
       * table in other clusters.
       */
      READY: 4
    }
  },

  /**
   * Possible timestamp granularities to use when keeping multiple versions
   * of data in a table.
   *
   * @enum {number}
   * @memberof google.bigtable.admin.v2
   */
  TimestampGranularity: {

    /**
     * The user did not specify a granularity. Should not be returned.
     * When specified during table creation, MILLIS will be used.
     */
    TIMESTAMP_GRANULARITY_UNSPECIFIED: 0,

    /**
     * The table keeps data versioned at a granularity of 1ms.
     */
    MILLIS: 1
  },

  /**
   * Defines a view over a table's fields.
   *
   * @enum {number}
   * @memberof google.bigtable.admin.v2
   */
  View: {

    /**
     * Uses the default view for each method as documented in its request.
     */
    VIEW_UNSPECIFIED: 0,

    /**
     * Only populates `name`.
     */
    NAME_ONLY: 1,

    /**
     * Only populates `name` and fields related to the table's schema.
     */
    SCHEMA_VIEW: 2,

    /**
     * Only populates `name` and fields related to the table's
     * replication state.
     */
    REPLICATION_VIEW: 3,

    /**
     * Populates all fields.
     */
    FULL: 4
  }
};

/**
 * A set of columns within a table which share a common configuration.
 *
 * @property {Object} gcRule
 *   Garbage collection rule specified as a protobuf.
 *   Must serialize to at most 500 bytes.
 *
 *   NOTE: Garbage collection executes opportunistically in the background, and
 *   so it's possible for reads to return a cell even if it matches the active
 *   GC expression for its family.
 *
 *   This object should have the same structure as [GcRule]{@link google.bigtable.admin.v2.GcRule}
 *
 * @typedef ColumnFamily
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ColumnFamily definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
 */
const ColumnFamily = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Rule for determining which cells to delete during garbage collection.
 *
 * @property {number} maxNumVersions
 *   Delete all cells in a column except the most recent N.
 *
 * @property {Object} maxAge
 *   Delete cells in a column older than the given age.
 *   Values must be at least one millisecond, and will be truncated to
 *   microsecond granularity.
 *
 *   This object should have the same structure as [Duration]{@link google.protobuf.Duration}
 *
 * @property {Object} intersection
 *   Delete cells that would be deleted by every nested rule.
 *
 *   This object should have the same structure as [Intersection]{@link google.bigtable.admin.v2.Intersection}
 *
 * @property {Object} union
 *   Delete cells that would be deleted by any nested rule.
 *
 *   This object should have the same structure as [Union]{@link google.bigtable.admin.v2.Union}
 *
 * @typedef GcRule
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GcRule definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
 */
const GcRule = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * A GcRule which deletes cells matching all of the given rules.
   *
   * @property {Object[]} rules
   *   Only delete cells which would be deleted by every element of `rules`.
   *
   *   This object should have the same structure as [GcRule]{@link google.bigtable.admin.v2.GcRule}
   *
   * @typedef Intersection
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.GcRule.Intersection definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
   */
  Intersection: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * A GcRule which deletes cells matching any of the given rules.
   *
   * @property {Object[]} rules
   *   Delete cells which would be deleted by any element of `rules`.
   *
   *   This object should have the same structure as [GcRule]{@link google.bigtable.admin.v2.GcRule}
   *
   * @typedef Union
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.GcRule.Union definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
   */
  Union: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * A snapshot of a table at a particular time. A snapshot can be used as a
 * checkpoint for data restoration or a data source for a new table.
 *
 * Note: This is a private alpha release of Cloud Bigtable snapshots. This
 * feature is not currently available to most Cloud Bigtable customers. This
 * feature might be changed in backward-incompatible ways and is not recommended
 * for production use. It is not subject to any SLA or deprecation policy.
 *
 * @property {string} name
 *   (`OutputOnly`)
 *   The unique name of the snapshot.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
 *
 * @property {Object} sourceTable
 *   (`OutputOnly`)
 *   The source table at the time the snapshot was taken.
 *
 *   This object should have the same structure as [Table]{@link google.bigtable.admin.v2.Table}
 *
 * @property {number} dataSizeBytes
 *   (`OutputOnly`)
 *   The size of the data in the source table at the time the snapshot was
 *   taken. In some cases, this value may be computed asynchronously via a
 *   background process and a placeholder of 0 will be used in the meantime.
 *
 * @property {Object} createTime
 *   (`OutputOnly`)
 *   The time when the snapshot is created.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} deleteTime
 *   (`OutputOnly`)
 *   The time when the snapshot will be deleted. The maximum amount of time a
 *   snapshot can stay active is 365 days. If 'ttl' is not specified,
 *   the default maximum of 365 days will be used.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {number} state
 *   (`OutputOnly`)
 *   The current state of the snapshot.
 *
 *   The number should be among the values of [State]{@link google.bigtable.admin.v2.State}
 *
 * @property {string} description
 *   (`OutputOnly`)
 *   Description of the snapshot.
 *
 * @typedef Snapshot
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.Snapshot definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/table.proto}
 */
const Snapshot = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * Possible states of a snapshot.
   *
   * @enum {number}
   * @memberof google.bigtable.admin.v2
   */
  State: {

    /**
     * The state of the snapshot could not be determined.
     */
    STATE_NOT_KNOWN: 0,

    /**
     * The snapshot has been successfully created and can serve all requests.
     */
    READY: 1,

    /**
     * The snapshot is currently being created, and may be destroyed if the
     * creation process encounters an error. A snapshot may not be restored to a
     * table while it is being created.
     */
    CREATING: 2
  }
};