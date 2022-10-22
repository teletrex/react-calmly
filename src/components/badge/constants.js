/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


/* TO DO: Synchronize with DSM
Not covered:
-Active (enabled)
-Sent (complete, published)
-Approved draft (approved)
-Waiting (scheduled, pending)
-Cancel pending
-Unknown
-Warning
 */

export const VALID_STATUS = [
  'disabled',
  'published',
  'approved',
  'draft , in Review',
  'draft',
  'pending',
  'success',
  'cancelled',
  'scheduled',
  'draft / Open',
  'inprogress / Sending',
  'failed',
  'complete',
  'enabled',
  'routine',
  'event',
  'retired',
  'paused',
];

export const STATUS_ICON_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
};
